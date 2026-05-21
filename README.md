# Foretold

An interactive prototype for a community feedback app — share an idea, give honest feedback, earn karma. Built with React 19 + Vite.

The Vite app lives in [`app/`](./app). Process notes and exploration are in [`Process/`](./Process).

## Run locally

```bash
cd app
npm install
npm run dev
```

Vite prints a `http://localhost:5173/` (or next free port) URL. Open it in a browser.

## Deploy

Pushes to `main` are built and published to GitHub Pages by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

After the first push, enable Pages once in the GitHub UI:

1. Open the repo → **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Re-run the latest workflow if needed.

The site will be served at `https://<your-username>.github.io/foretold/`. The Vite config reads `NODE_ENV` and sets `base: '/foretold/'` for production builds, so static assets (covers, icons, etc.) resolve correctly under the sub-path.

For Vercel/Netlify, point the project root at `app/`; no `base` change is needed.
