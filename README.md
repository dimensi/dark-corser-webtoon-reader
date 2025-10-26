# Dark Score Webtoon Reader

Dark Score Webtoon Reader is a SvelteKit + TypeScript application that generates shareable reading links for ZIP archives hosted on Google Drive or any CORS-friendly HTTP source. The reader streams long-form images directly in the browser, making it ideal for webtoon-style archives.

**Live Demo**: [https://dark-corser-webtoon-reader.vercel.app](https://dark-corser-webtoon-reader.vercel.app)

> **Настройка названия сайта**: Название сайта можно изменить в файле `src/lib/config.ts` в переменной `SITE_NAME`. Это изменит название во всем приложении.

## Features

- **Google OAuth Integration**: Secure authentication with Google Drive API
- **Private File Access**: Read private Google Drive files with proper authorization
- **Public File Support**: Fallback to public Google Drive links
- Generate `/read/<driveId>` links from Google Drive share URLs
- Generate `/read?src=<encoded-url>` links for direct HTTP(S) archives
- Server-side proxy endpoint for Google Drive to bypass CORS restrictions
- ZIP archive parsing with natural sorting and lazy-rendered image stack (max width 1000px)
- Clear error messaging for unsupported archives, missing images, or blocked downloads
- **Privacy Policy & Terms of Service**: Compliant with Google OAuth requirements

## Getting Started

```bash
npm install
npm run dev
```

The development server runs at [http://localhost:5173](http://localhost:5173). The reader routes and API proxy are available during local development and on Vercel deployments.

## Building & Deployment

Archive Reader is configured with `@sveltejs/adapter-vercel` and can be deployed directly to Vercel:

```bash
npm run build
vercel --prod
```

## Project Structure

```
src/
  lib/
    components/         # Shared UI components
    utils/              # Archive helpers (detection, sorting)
    zip/                # ZIP extraction helpers
  routes/
    +page.svelte        # Link generator
    read/               # Reader pages for direct URLs and Drive IDs
    api/proxy/[id]/     # Google Drive proxy endpoint
```

## Testing with Sample Archives

To validate ordering and rendering, you can use a ZIP archive containing sequentially named images (e.g., `01.jpg` – `12.jpg`). Load it through either the Drive proxy or a direct URL with permissive CORS headers.
