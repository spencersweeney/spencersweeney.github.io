# Credits — Lampkeep of the Green Spire

## Original

Procedural meshes (Lampkeep, Gorse-sprites, Draft Wisps, Gatewick, Mist Road, shrines, spire) and the 32–64 px textures are original to this slice. See `public/licenses/ORIGINAL-ART.txt` (CC0 1.0).

No Quaternius, Poly Pizza, Kenney, or KayKit files are shipped. Packs were not vendored because a per-file license was not placed on disk at build time.

## three.js

[three.js](https://threejs.org/) r187 (`three@0.187.0`) is used for rendering. MIT License. A copy is in `public/licenses/three.MIT.txt` and is published with the page under `/lampkeep/licenses/three.MIT.txt`.

## Tooling (not shipped in the page)

Vite, TypeScript, Vitest, and Playwright are development dependencies. `@gltf-transform/cli` is installed for the spec's asset step; this slice has no glTF files to optimize.

## Audio

No sampled audio. Optional square-wave blips are synthesized in the browser and stay silent until a click or key unlocks audio.
