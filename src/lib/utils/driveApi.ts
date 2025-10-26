/**
 * Утилиты для работы с Google Drive API напрямую с клиента
 */

const DRIVE_API_ENDPOINT = 'https://www.googleapis.com/drive/v3/files';
const DRIVE_PUBLIC_ENDPOINT = 'https://drive.google.com/uc?export=download&id=';

export interface DriveApiError {
  status: number;
  message: string;
  requiresAuth?: boolean;
}

/**
 * Получить файл из Google Drive с авторизацией
 */
export async function fetchDriveFileWithAuth(
  fileId: string, 
  accessToken: string
): Promise<Response> {
  const response = await fetch(`${DRIVE_API_ENDPOINT}/${encodeURIComponent(fileId)}?alt=media`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/octet-stream'
    }
  });

  if (!response.ok) {
    const error: DriveApiError = {
      status: response.status,
      message: getErrorMessage(response.status),
      requiresAuth: response.status === 401
    };
    throw error;
  }

  return response;
}

/**
 * Получить файл из Google Drive через публичную ссылку (fallback)
 */
export async function fetchDriveFilePublic(fileId: string): Promise<Response> {
  const initial = await fetch(`${DRIVE_PUBLIC_ENDPOINT}${encodeURIComponent(fileId)}`, {
    headers: {
      accept: 'application/octet-stream'
    }
  });

  if (initial.status >= 300 && initial.status < 400) {
    const redirectUrl = initial.headers.get('location');
    if (redirectUrl) {
      return await fetch(redirectUrl);
    }
  }

  const contentType = initial.headers.get('content-type') ?? '';
  if (contentType.includes('text/html')) {
    const html = await initial.text();
    const confirmMatch = html.match(/confirm=([0-9A-Za-z_]+)/);
    if (confirmMatch) {
      const confirmToken = confirmMatch[1];
      return await fetch(`${DRIVE_PUBLIC_ENDPOINT}${encodeURIComponent(fileId)}&confirm=${confirmToken}`, {
        headers: {
          accept: 'application/octet-stream'
        }
      });
    }

    throw new Error('Google Drive requires a confirmation step that could not be completed.');
  }

  return initial;
}

/**
 * Умная функция для получения файла из Google Drive
 * Сначала пробует авторизованный запрос, затем fallback на публичную ссылку
 */
export async function fetchDriveFile(
  fileId: string, 
  accessToken?: string
): Promise<Response> {
  // Если есть токен, пробуем авторизованный запрос
  if (accessToken) {
    try {
      return await fetchDriveFileWithAuth(fileId, accessToken);
    } catch (error) {
      // Если ошибка авторизации, пробуем публичную ссылку
      if (error instanceof Error && error.message.includes('401')) {
        console.warn('Auth failed, trying public link:', error.message);
        return await fetchDriveFilePublic(fileId);
      }
      // Для других ошибок (403, 404) - пробуем публичную ссылку
      if (error instanceof Error && (error.message.includes('403') || error.message.includes('404'))) {
        console.warn('Access denied via API, trying public link:', error.message);
        return await fetchDriveFilePublic(fileId);
      }
      // Перебрасываем другие ошибки
      throw error;
    }
  }

  // Если нет токена, используем публичную ссылку
  return await fetchDriveFilePublic(fileId);
}

/**
 * Получить понятное сообщение об ошибке
 */
function getErrorMessage(status: number): string {
  switch (status) {
    case 401:
      return 'Invalid or expired access token. Please re-authenticate.';
    case 403:
      return 'Access denied. You may not have permission to access this file.';
    case 404:
      return 'File not found or not accessible.';
    case 429:
      return 'Too many requests. Please try again later.';
    case 500:
      return 'Google Drive API error. Please try again.';
    default:
      return `Google Drive API error (status ${status})`;
  }
}

/**
 * Проверить, поддерживает ли браузер прямые запросы к Google Drive API
 */
export function supportsDirectDriveApi(): boolean {
  // Проверяем поддержку fetch и CORS
  return typeof fetch !== 'undefined' && typeof Headers !== 'undefined';
}
