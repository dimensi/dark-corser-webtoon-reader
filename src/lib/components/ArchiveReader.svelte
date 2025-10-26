<script lang="ts">
  import { onDestroy } from 'svelte';
  import { detectArchive } from '$lib/utils/detectArchive';
  import { listZipImages } from '$lib/zip/extract';
  import { googleAuthService } from '$lib/services/googleAuth';
  import { fetchDriveFile, type DriveApiError } from '$lib/utils/driveApi';
  import DriveFileLoader from './DriveFileLoader.svelte';

  type SourceType = 'drive' | 'direct';

  const props = $props<{ sourceType: SourceType; source: string }>();
  const sourceType = $derived(props.sourceType);
  const source = $derived(props.source);

  let status = $state('Preparing…');
  let error: (string | null) = $state(null);
  let images: { name: string; url: string }[] = $state([]);
  let total = $state(0);
  let extracted = $state(0);

  const objectUrls: string[] = [];

  async function loadArchive(currentType: SourceType, currentSource: string) {
    if (!currentSource) {
      error = 'No archive source provided.';
      status = 'Idle';
      return;
    }

    cleanup();
    images = [];
    total = 0;
    extracted = 0;
    error = null;

    status = 'Fetching archive…';

    try {
      let response: Response;

      if (currentType === 'drive') {
        // Для Google Drive используем прямые запросы к API
        const accessToken = googleAuthService.isAuthenticated() 
          ? googleAuthService.getAccessToken() 
          : undefined;
        
        response = await fetchDriveFile(currentSource, accessToken || undefined);
      } else {
        // Для прямых URL используем обычный fetch
        response = await fetch(currentSource);
      }

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication required. Please sign in to access this file.');
        } else if (response.status === 403) {
          throw new Error('Access denied. You may not have permission to access this file.');
        } else if (response.status === 404) {
          throw new Error('File not found or not accessible.');
        } else {
          throw new Error(`Unable to fetch archive (status ${response.status})`);
        }
      }

      await processArchive(response);
    } catch (err) {
      console.error(err);
      
      if (err && typeof err === 'object' && 'status' in err) {
        // Обработка DriveApiError
        const driveError = err as DriveApiError;
        if (driveError.requiresAuth) {
          error = 'Authentication required. Please sign in to access this file.';
        } else {
          error = driveError.message;
        }
      } else if (err instanceof Error) {
        if (err.name === 'TypeError') {
          error = 'Failed to fetch archive. The host may not allow cross-origin downloads. Try using a Google Drive link instead.';
        } else {
          error = err.message;
        }
      } else {
        error = 'Unknown error while loading archive.';
      }
      status = 'Stopped';
    }
  }

  async function processArchive(response: Response) {
    const blob = await response.blob();
    const headerBytes = new Uint8Array(await blob.slice(0, 8).arrayBuffer());
    const archiveType = detectArchive(headerBytes);

    if (archiveType === 'rar') {
      error = 'RAR archives are not supported in this build.';
      status = 'Stopped';
      return;
    }

    if (archiveType !== 'zip') {
      error = 'Unsupported archive format. Please upload a ZIP file.';
      status = 'Stopped';
      return;
    }

    status = 'Parsing archive…';
    const entries = await listZipImages(blob);
    total = entries.length;

    if (total === 0) {
      error = 'No images found in archive.';
      status = 'Stopped';
      return;
    }

    for (const entry of entries) {
      extracted += 1;
      status = `Extracting ${extracted}/${total}…`;
      const imageBlob = await entry.file.async('blob');
      const objectUrl = URL.createObjectURL(imageBlob);
      objectUrls.push(objectUrl);
      images = [...images, { name: entry.name, url: objectUrl }];
    }

    status = `Loaded ${total} image${total === 1 ? '' : 's'}.`;
  }

  function cleanup() {
    while (objectUrls.length > 0) {
      const url = objectUrls.pop();
      if (url) URL.revokeObjectURL(url);
    }
  }

  $effect(() => {
    void loadArchive(sourceType, source);
  });

  onDestroy(() => {
    cleanup();
  });
</script>

<div class="reader">
  <p class="status" aria-live="polite">{status}</p>
  {#if error}
    <p class="error" role="alert">{error}</p>
  {/if}

  <div class="images">
    {#each images as image, index}
      <figure class="image-frame">
        <img src={image.url} alt={`Page ${index + 1}: ${image.name}`} loading="lazy" />
      </figure>
    {/each}
  </div>
</div>

<style>
  .reader {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: #eee;
  }

  .status {
    font-size: 0.95rem;
    color: #bdbdbd;
  }

  .error {
    color: #ff8686;
    font-weight: 500;
  }

  .images {
    display: flex;
    flex-direction: column;
  }

  .image-frame {
    margin: 0;
  }

  img {
    display: block;
    width: 100%;
    max-width: 1000px;
    height: auto;
    margin: 0 auto;
    border-radius: 4px;
    background: #1b1b1b;
  }
</style>
