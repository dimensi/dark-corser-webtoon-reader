<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="app-shell">
  {@render children?.()}
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #111;
    color: #eee;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(a) {
    color: inherit;
  }

  :global(button:focus-visible),
  :global(a:focus-visible),
  :global(input:focus-visible) {
    outline: 2px solid #5d8cff;
    outline-offset: 2px;
  }

  .app-shell {
    min-height: 100vh;
  }
</style>
