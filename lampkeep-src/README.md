# Lampkeep of the Green Spire

A short exploration slice: cross the old stones with the lamp, read journal pages, and wake Gatewick by lighting the terrace in order. Career facts live in `content/career.json`. The game is at `/lampkeep/` and the no-3D career page is at `/lampkeep/career/`.

## Play locally

From this directory:

```bash
npm install
npm run dev
```

Open http://localhost:5173/lampkeep/

Keyboard: WASD or arrows move, mouse look, Space jump (hold to glide), E or left click lamp (hold to raise, tap to flare), F read, Shift run, Esc or P pause. A gamepad uses the left stick to move, the right stick to look, A to jump, X or RT for the lamp, Y to read, and Start to pause. On a phone in landscape, use the left stick, Jump, Lamp, and drag the upper right to look.

To serve the built game, the career page, and the homepage together:

```bash
npm run build
python3 -m http.server 4173 --directory ..
```

- Homepage: http://127.0.0.1:4173/
- Lampkeep: http://127.0.0.1:4173/lampkeep/
- Career: http://127.0.0.1:4173/lampkeep/career/

## Checks

```bash
npm run content:check
npm test
npm run build
npm run test:e2e
npm run perf
```

`npm run build` writes `../lampkeep`, including `career/index.html`. Placeholder career rows stay in dev and are omitted from that build.

## Pages note

GitHub Pages serves the `gh-pages` branch from `/`. There is no CNAME. `npm run build` writes `/lampkeep/` and that folder is what this branch would publish. The solar-system deploy on `main` (`npm run deploy`, which runs `gh-pages -d dist`) **replaces the entire `gh-pages` branch** with Parcel's `dist/`. Copy `lampkeep/` into `dist/lampkeep/` before that deploy or this path will disappear. The homepage "Career & resume" link also has to be reapplied from `docs/homepage-link.patch` onto `main`'s `src/index.html`, or that deploy will drop it. This package does not run that deploy.
