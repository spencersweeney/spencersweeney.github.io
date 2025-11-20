import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

const LABEL_FONT_URL = 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json';

let fontPromise = null;
const loader = new FontLoader();

export function loadLabelFont() {
  if (!fontPromise) {
    fontPromise = new Promise((resolve, reject) => {
      loader.load(LABEL_FONT_URL, resolve, undefined, reject);
    });
  }

  return fontPromise;
}

