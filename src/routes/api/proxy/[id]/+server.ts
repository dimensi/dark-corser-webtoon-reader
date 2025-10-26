import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const DRIVE_ENDPOINT = 'https://drive.google.com/uc?export=download&id=';
const DRIVE_API_ENDPOINT = 'https://www.googleapis.com/drive/v3/files';

async function resolveDriveResponse(id: string, fetchImpl: typeof fetch): Promise<Response> {
  const initial = await fetchImpl(`${DRIVE_ENDPOINT}${encodeURIComponent(id)}`, {
    headers: {
      accept: 'application/octet-stream'
    }
  });

  if (initial.status >= 300 && initial.status < 400) {
    const redirectUrl = initial.headers.get('location');
    if (redirectUrl) {
      return await fetchImpl(redirectUrl);
    }
  }

  const contentType = initial.headers.get('content-type') ?? '';
  if (contentType.includes('text/html')) {
    const html = await initial.text();
    const confirmMatch = html.match(/confirm=([0-9A-Za-z_]+)/);
    if (confirmMatch) {
      const confirmToken = confirmMatch[1];
      return await fetchImpl(`${DRIVE_ENDPOINT}${encodeURIComponent(id)}&confirm=${confirmToken}`, {
        headers: {
          accept: 'application/octet-stream'
        }
      });
    }

    throw error(403, 'Google Drive requires a confirmation step that could not be completed.');
  }

  return initial;
}

async function resolveDriveResponseWithAuth(id: string, accessToken: string, fetchImpl: typeof fetch): Promise<Response> {
  const response = await fetchImpl(`${DRIVE_API_ENDPOINT}/${encodeURIComponent(id)}?alt=media`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/octet-stream'
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw error(401, 'Invalid or expired access token. Please re-authenticate.');
    } else if (response.status === 403) {
      throw error(403, 'Access denied. You may not have permission to access this file.');
    } else if (response.status === 404) {
      throw error(404, 'File not found or not accessible.');
    } else {
      throw error(response.status, `Google Drive API error: ${response.statusText}`);
    }
  }

  return response;
}

export const GET: RequestHandler = async ({ params, fetch, request }) => {
  const { id } = params;

  if (!id) {
    throw error(400, 'Missing Google Drive file ID.');
  }

  // Проверяем наличие Authorization header
  const authHeader = request.headers.get('authorization');
  const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  let driveResponse: Response;

  try {
    if (accessToken) {
      // Используем Google Drive API v3 с авторизацией
      driveResponse = await resolveDriveResponseWithAuth(id, accessToken, fetch);
    } else {
      // Fallback на публичные ссылки
      driveResponse = await resolveDriveResponse(id, fetch);
    }
  } catch (err) {
    // Если авторизованный запрос не удался, пробуем публичную ссылку
    if (accessToken && err instanceof Error && err.message.includes('401')) {
      try {
        driveResponse = await resolveDriveResponse(id, fetch);
      } catch (fallbackErr) {
        throw err; // Выбрасываем оригинальную ошибку авторизации
      }
    } else {
      throw err;
    }
  }

  if (!driveResponse.ok || !driveResponse.body) {
    const statusText = driveResponse.statusText || 'Unable to download file from Google Drive.';
    throw error(driveResponse.status || 500, statusText);
  }

  const headers = new Headers();
  headers.set('access-control-allow-origin', '*');
  headers.set('content-type', driveResponse.headers.get('content-type') ?? 'application/octet-stream');
  const disposition = driveResponse.headers.get('content-disposition');
  if (disposition) {
    headers.set('content-disposition', disposition);
  }

  return new Response(driveResponse.body, {
    status: 200,
    headers
  });
};
