<script lang="ts">
  import { browser } from '$app/environment';

  let driveOrHttpUrl = '';
  let generatedPath: string | null = null;
  let error: string | null = null;
  let copied = false;

  const driveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i;

  function generateLink() {
    error = null;
    copied = false;
    generatedPath = null;

    const input = driveOrHttpUrl.trim();

    if (!input) {
      error = 'Enter a Google Drive share link or direct archive URL.';
      return;
    }

    const driveMatch = input.match(driveRegex);
    if (driveMatch) {
      const id = driveMatch[1];
      generatedPath = `/read/${encodeURIComponent(id)}`;
      return;
    }

    try {
      // Validate URL
      const parsed = new URL(input);
      if (!parsed.protocol.startsWith('http')) {
        throw new Error('Only HTTP(S) URLs are supported.');
      }
      generatedPath = `/read?src=${encodeURIComponent(parsed.toString())}`;
    } catch (err) {
      error = 'Enter a valid HTTP or Google Drive link.';
    }
  }

  async function copyLink() {
    if (!generatedPath || !browser) return;

    const absolute = new URL(generatedPath, window.location.origin).toString();

    try {
      await navigator.clipboard.writeText(absolute);
      copied = true;
    } catch (err) {
      console.error(err);
      error = 'Unable to copy link automatically. You can copy it manually below.';
    }
  }
</script>

<svelte:head>
  <title>Archive Reader · Link Generator</title>
</svelte:head>

<main class="page">
  <section class="card">
    <h1>Archive Reader</h1>
    <p class="description">
      Paste a Google Drive share link or any direct HTTP(S) archive URL. We'll generate a reader link that renders the images inline.
    </p>

    <form class="form" on:submit|preventDefault={generateLink}>
      <label for="source">Archive URL</label>
      <input
        id="source"
        name="source"
        type="url"
        placeholder="https://drive.google.com/file/d/…"
        bind:value={driveOrHttpUrl}
        required
      />
      <button type="submit">Generate reading link</button>
    </form>

    {#if error}
      <p class="error" role="alert">{error}</p>
    {/if}

    {#if generatedPath}
      <div class="result">
        <p>Your reading link:</p>
        <a class="result-link" href={generatedPath}>{generatedPath}</a>
        {#if browser}
          <button class="copy" type="button" on:click={copyLink}>Copy to clipboard</button>
          {#if copied}
            <p class="copied" role="status">Copied!</p>
          {/if}
        {/if}
      </div>
    {/if}
  </section>

  <section class="help">
    <h2>How it works</h2>
    <ul>
      <li>Google Drive links become <code>/read/&lt;fileId&gt;</code> routes that proxy downloads through this app.</li>
      <li>Other HTTP(S) links become <code>/read?src=&lt;encoded URL&gt;</code>. Ensure the host allows cross-origin downloads.</li>
      <li>Readers extract ZIP archives, sort long images numerically, and display them stacked for smooth scrolling.</li>
    </ul>
  </section>
</main>

<style>
  main.page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1.5rem 3rem;
    color: #eee;
    max-width: 840px;
    margin: 0 auto;
  }

  .card {
    background: rgba(26, 26, 26, 0.85);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  h1 {
    margin: 0;
    font-size: 2rem;
  }

  .description {
    margin: 0;
    line-height: 1.6;
    color: #c5c5c5;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  label {
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  input {
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid #2f2f2f;
    background: #151515;
    color: inherit;
    font-size: 1rem;
  }

  input:focus {
    outline: 2px solid #5d8cff;
    outline-offset: 2px;
  }

  button[type='submit'],
  .copy {
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 8px;
    background: #5d8cff;
    color: #0b0b0b;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  button[type='submit']:hover,
  .copy:hover {
    background: #80a7ff;
  }

  .error {
    margin: 0;
    color: #ff8686;
    font-weight: 500;
  }

  .result {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .result-link {
    color: #80a7ff;
    word-break: break-all;
  }

  .copied {
    margin: 0;
    color: #93e29f;
  }

  .help {
    color: #c5c5c5;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  ul {
    margin: 0;
    padding-left: 1.25rem;
    line-height: 1.6;
  }

  code {
    background: rgba(255, 255, 255, 0.08);
    padding: 0.1rem 0.35rem;
    border-radius: 4px;
    font-size: 0.95rem;
  }

  @media (max-width: 600px) {
    main.page {
      padding: 1.5rem 1rem 2.5rem;
    }

    .card {
      padding: 1.5rem;
    }

    h1 {
      font-size: 1.6rem;
    }
  }
</style>
