# Lampkeep of the Green Spire

A short third-person slice: walk Mist Road, fight Gorse-sprites and Draft Wisps, and defeat Gatewick at the Spire gate. It is published at `/lampkeep/` beside the solar-system homepage. Homepage files at the repository root are not part of this app.

## Play locally

From this directory:

```bash
npm install
npm run dev
```

Open http://localhost:5173/lampkeep/

Keyboard: WASD move, mouse look, click or J attack, Space dodge, F lamp flare, Q lock-on, E rest at a shrine, Esc pause. A gamepad uses the standard layout (South attack, East dodge, West flare, North or R3 lock-on, Start pause). On a phone in landscape, use the left stick, the L / D / A buttons, and drag the upper right to look.

To serve the built game and the homepage together:

```bash
npm run build
python3 -m http.server 4173 --directory ..
```

- Homepage: http://127.0.0.1:4173/
- Lampkeep: http://127.0.0.1:4173/lampkeep/

## Checks

```bash
npm test          # combat rules and a scripted clear
npm run build     # writes ../lampkeep for GitHub Pages
npm run test:e2e  # menus, axe, homepage, screenshots
npm run perf      # gzip budgets
```

`npm run build` must run before the browser checks so `/lampkeep/` exists.

## Pages note

GitHub Pages serves the `gh-pages` branch from `/`. There is no CNAME. `npm run build` writes `/lampkeep/` and that folder is what this branch would publish. The solar-system deploy on `main` (`npm run deploy`, which runs `gh-pages -d dist`) **replaces the entire `gh-pages` branch** with Parcel's `dist/`. Copy `lampkeep/` into `dist/lampkeep/` before that deploy or this path will disappear. This package does not run that deploy.
