# Lampkeep of the Green Spire

One-night slice of a hospitality game. It is published at `/lampkeep/` beside the existing solar-system homepage. The homepage files at the repository root are not part of this app.

## Play locally

From this directory:

```bash
npm install
npm run dev
```

Open http://localhost:5173/lampkeep/

To serve the built game and the homepage together:

```bash
npm run build
python3 -m http.server 4173 --directory ..
```

- Homepage: http://127.0.0.1:4173/
- Lampkeep: http://127.0.0.1:4173/lampkeep/

## Checks

```bash
npm test          # rules and scripted nights
npm run build     # writes ../lampkeep for GitHub Pages
npm run test:e2e  # axe, keyboard night, layout, homepage
npm run perf      # gzip budget and Lighthouse
```

`npm run build` must run before the browser checks so `/lampkeep/` exists.

## Pages note

GitHub Pages serves the `gh-pages` branch from `/`. `npm run build` commits its output in `/lampkeep/` when that folder is checked in. The solar-system deploy on `main` (`gh-pages -d dist`) replaces the whole `gh-pages` branch with Parcel's `dist/`. Copy `lampkeep/` into `dist/lampkeep/` before that deploy or this path will disappear.
