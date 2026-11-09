# Credits — Lampkeep of the Green Spire

| File | Source | License |
|---|---|---|
| `public/models/lampkeep.glb` | KayKit Character Pack: Adventurers 1.0, Rogue Hooded. https://github.com/KayKit-Game-Assets/KayKit-Character-Pack-Adventures (pack 1.0). Page: https://kaylousberg.itch.io/kaykit-adventurers. Downloaded 2026-11-09. | CC0 1.0. Copy in `licenses/kaykit-adventurers.txt` and `public/licenses/kaykit-adventurers.txt`. |
| Gatewick, valley, trees, braziers, stones, tent | Original for this page. | CC0 1.0. `public/licenses/ORIGINAL-ART.txt`. |
| three.js r187 | https://threejs.org/ `three@0.187.0` | MIT. `public/licenses/three.MIT.txt`. |

Kenney Nature Kit was not vendored. The GitHub repository returned 404 and the kenney.nl zip returned 403, so no license file could be verified on disk. Trees, the tent, and Gatewick use original meshes instead.

Quaternius packs were not used.

The KayKit file keeps four clips (Idle, Walking_A, Running_A, Jump_Full_Short) and a 128 px texture. Glide and mantle are procedural. The mesh is about 13k triangles because simplifying it removed the skin. That is over the 2,000 triangle aim and is called out in the PR.

## Audio

No sampled audio. Optional square-wave blips are synthesized in the browser and stay silent until a click or key unlocks audio.
