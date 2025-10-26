<script lang="ts">
  import ArchiveReader from '$lib/components/ArchiveReader.svelte';
  import type { PageData } from './$types';

  const props = $props<{ data: PageData }>();
  const data = $derived(props.data);
  const src = $derived(data.src?.trim() ?? '');
</script>

<svelte:head>
  <title>Archive Reader</title>
</svelte:head>

<main class="reader-page">
  {#if src}
    <p class="hint">Direct downloads require CORS-permissive hosts. If loading fails, upload the archive to Google Drive and use a generated link.</p>
    <ArchiveReader sourceType="direct" source={src} />
  {:else}
    <p class="error" role="alert">No archive URL supplied. Append <code>?src=&lt;encoded URL&gt;</code> to this page.</p>
  {/if}
</main>

<style>
  .reader-page {
    min-height: 100vh;
    padding: 1.5rem 1rem 3rem;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  h1 {
    margin: 0;
    font-size: 1.75rem;
  }

  .error {
    color: #ff8686;
  }

  .hint {
    color: #c5c5c5;
    margin: 0;
  }

  code {
    background: rgba(255, 255, 255, 0.08);
    padding: 0.1rem 0.35rem;
    border-radius: 4px;
  }
</style>
