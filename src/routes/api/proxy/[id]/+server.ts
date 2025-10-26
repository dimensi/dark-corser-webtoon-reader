import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const DRIVE_ENDPOINT = 'https://drive.google.com/uc?export=download&id=';

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

export const GET: RequestHandler = async ({ params, fetch }) => {
  const { id } = params;

  if (!id) {
    throw error(400, 'Missing Google Drive file ID.');
  }

  const driveResponse = await resolveDriveResponse(id, fetch);

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
