<script lang="ts">
  import { fetchDriveFile, type DriveApiError } from '$lib/utils/driveApi';
  import { googleAuthService } from '$lib/services/googleAuth';

  const props = $props<{ fileId: string }>();
  const fileId = $derived(props.fileId);

  let useProxy = $state(false);
  let isLoading = $state(false);
  let error: string | null = $state(null);
  let response: Response | null = $state(null);

  /**
   * Загрузить файл с прямыми запросами к Google Drive API
   */
  const loadDirect = async () => {
    isLoading = true;
    error = null;
    useProxy = false;

    try {
      const accessToken = googleAuthService.isAuthenticated() 
        ? googleAuthService.getAccessToken() 
        : undefined;
      
      response = await fetchDriveFile(fileId, accessToken || undefined);
    } catch (err) {
      console.error('Direct API request failed:', err);
      
      if (err && typeof err === 'object' && 'status' in err) {
        const driveError = err as DriveApiError;
        error = driveError.message;
      } else if (err instanceof Error) {
        error = err.message;
      } else {
        error = 'Unknown error while loading file.';
      }
    } finally {
      isLoading = false;
    }
  }

  /**
   * Загрузить файл через прокси (fallback)
   */
  const loadViaProxy = async () => {
    isLoading = true;
    error = null;
    useProxy = true;

    try {
      const headers: HeadersInit = {};
      
      if (googleAuthService.isAuthenticated()) {
        const accessToken = googleAuthService.getAccessToken();
        if (accessToken) {
          headers['Authorization'] = `Bearer ${accessToken}`;
        }
      }

      response = await fetch(`/api/proxy/${encodeURIComponent(fileId)}`, { headers });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication required. Please sign in to access this file.');
        } else if (response.status === 403) {
          throw new Error('Access denied. You may not have permission to access this file.');
        } else if (response.status === 404) {
          throw new Error('File not found or not accessible.');
        } else {
          throw new Error(`Unable to fetch file (status ${response.status})`);
        }
      }
    } catch (err) {
      console.error('Proxy request failed:', err);
      
      if (err instanceof Error) {
        error = err.message;
      } else {
        error = 'Unknown error while loading file.';
      }
    } finally {
      isLoading = false;
    }
  }

  /**
   * Умная загрузка: сначала пробуем прямые запросы, затем прокси
   */
  const loadSmart = async () => {
    await loadDirect();
    
    // Если прямые запросы не сработали, пробуем прокси
    if (error && !useProxy) {
      console.log('Direct API failed, trying proxy fallback...');
      await loadViaProxy();
    }
  };

  // Автоматически загружаем файл при изменении fileId
  $effect(() => {
    if (fileId) {
      void loadSmart();
    }
  });

  // Экспортируем состояние для родительского компонента
  export { response, isLoading, error, useProxy, loadDirect, loadViaProxy, loadSmart };
</script>

<div class="drive-loader">
  {#if isLoading}
    <p class="status">Loading file...</p>
  {/if}
  
  {#if error}
    <div class="error-section">
      <p class="error" role="alert">{error}</p>
      <div class="retry-options">
        {#if !useProxy}
          <button onclick={loadViaProxy} class="retry-button">
            Try via proxy
          </button>
        {:else}
          <button onclick={loadDirect} class="retry-button">
            Try direct API
          </button>
        {/if}
        <button onclick={loadSmart} class="retry-button">
          Retry
        </button>
      </div>
    </div>
  {/if}
  
  {#if response && !isLoading}
    <p class="success">
      ✓ File loaded {useProxy ? 'via proxy' : 'directly from Google Drive API'}
    </p>
  {/if}
</div>

<style>
  .drive-loader {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .status {
    color: #bdbdbd;
    font-size: 0.9rem;
  }

  .error-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .error {
    color: #ff8686;
    font-weight: 500;
    margin: 0;
  }

  .retry-options {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .retry-button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background: #2f2f2f;
    color: #eee;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .retry-button:hover {
    background: #404040;
  }

  .success {
    color: #93e29f;
    font-size: 0.9rem;
    margin: 0;
  }
</style>
