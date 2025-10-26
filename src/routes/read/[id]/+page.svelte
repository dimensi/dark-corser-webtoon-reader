<script lang="ts">
  import ArchiveReader from '$lib/components/ArchiveReader.svelte';
  import type { PageData } from './$types';

  const props = $props<{ data: PageData }>();
  const data = $derived(props.data);
</script>

<svelte:head>
  <title>Archive Reader · {data.id}</title>
</svelte:head>

<main class="reader-page">
  <h1>Archive Reader</h1>
  <ArchiveReader sourceType="drive" source={data.id} />
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
</style>
