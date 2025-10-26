<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import GoogleAuthButton from '$lib/components/GoogleAuthButton.svelte';
  import { SITE_NAME } from '$lib/config';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="app-shell">
  <header class="app-header">
    <div class="header-content">
      <h1 class="app-title">{SITE_NAME}</h1>
      <GoogleAuthButton />
    </div>
  </header>
  <main class="app-main">
    {@render children?.()}
  </main>
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
    display: flex;
    flex-direction: column;
  }

  .app-header {
    background: rgba(26, 26, 26, 0.95);
    border-bottom: 1px solid #2f2f2f;
    padding: 1rem 0;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(10px);
  }

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .app-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #eee;
  }

  .app-main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 600px) {
    .header-content {
      padding: 0 1rem;
      flex-direction: column;
      gap: 1rem;
    }

    .app-title {
      font-size: 1.25rem;
    }
  }
</style>
