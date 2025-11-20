# spencersweeney.github.io

Interactive Three.js experiments (space scene, planet explorer, and more) that power the content at `spencersweeney.github.io`. The project is bundled with Parcel and published to GitHub Pages via the `gh-pages` npm package.

## Prerequisites

- Node.js ≥ 18 (LTS recommended) and npm
- GitHub repository already configured (this repo) with Pages enabled from the `gh-pages` branch

```bash
# install dependencies once
npm install
```

## Local development

Parcelʼs dev server is not scripted, but you can run it manually if you want live reload while editing:

```bash
npx parcel src/index.html --open
```

This serves the app at `http://localhost:1234` and watches the `src/` directory.

## Build for production

```bash
npm run build
```

- Outputs optimized assets into `dist/`
- Cleans/rewrites hashed assets so the folder is safe to publish directly to GitHub Pages

## Deploy to GitHub Pages

1. Make sure you are on the branch you want to ship (typically `main`) and that your work is committed.
2. Build locally (`npm run build`). This step is optional—the deploy script also builds if needed, but running it yourself lets you verify locally.
3. Deploy:

```bash
npm run deploy
```

The `deploy` script runs `gh-pages -d dist`, which pushes the contents of `dist/` to the `gh-pages` branch. GitHub Pages then serves that branch at `https://<username>.github.io/`.

If you are configuring this project in a new repo, go to **Settings → Pages** and choose the `gh-pages` branch with the `/ (root)` path.

## Verifying a deployment

- After `npm run deploy`, visit `https://spencersweeney.github.io/` (or the custom domain you have configured).
- Use the browser devtools network tab to confirm assets load without 404s. Cache-busting hashes ensure fresh loads, but you can also force refresh (`Cmd+Shift+R`).

## Troubleshooting

- **`gh-pages` command not found**: Ensure `npm install` was run and you are using the repo’s checked-in `package-lock.json`.
- **Assets missing after deploy**: Delete the local `dist/` folder, rerun `npm run build`, then `npm run deploy`.
- **Parcel dev server failing to load textures**: Large textures live under `src/assets/`; make sure Parcel is still running after adding new files so it can rebuild.

With those steps, you can iterate locally and publish updates to GitHub Pages in a couple of commands.

