import {
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  type Material,
  type Texture,
} from "three";

const snaps: { value: number }[] = [];
const wobbles: { value: number }[] = [];
let snapOn = 1;
let wobbleOn = 0;

export function setPS1Flags(opts: { snap?: boolean; wobble?: boolean }): void {
  if (opts.snap !== undefined) snapOn = opts.snap ? 1 : 0;
  if (opts.wobble !== undefined) wobbleOn = opts.wobble ? 1 : 0;
  for (const u of snaps) u.value = snapOn;
  for (const u of wobbles) u.value = wobbleOn;
}

/** Optional vertex snap and texture wobble. Both are no-ops until the material compiles. */
export function patchPS1(material: Material): void {
  material.onBeforeCompile = (shader) => {
    const snap = { value: snapOn };
    const wobble = { value: wobbleOn };
    snaps.push(snap);
    wobbles.push(wobble);
    shader.uniforms.uSnap = snap;
    shader.uniforms.uWobble = wobble;
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
uniform float uSnap;
uniform float uWobble;`,
      )
      .replace(
        "#include <project_vertex>",
        `#include <project_vertex>
if (uSnap > 0.5) {
  float snapW = max(abs(gl_Position.w), 0.0001);
  vec2 grid = vec2(480.0, 270.0);
  gl_Position.xy = floor(gl_Position.xy / snapW * grid + 0.5) / grid * snapW;
}`,
      )
      .replace(
        "vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;",
        `vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
if (uWobble > 0.5) {
  vMapUv = floor(vMapUv * 24.0 + gl_Position.w * 0.4) / 24.0;
}`,
      );
  };
}

const litCache = new Map<number, MeshLambertMaterial>();

export function lit(color: number): MeshLambertMaterial {
  const found = litCache.get(color);
  if (found) return found;
  const material = new MeshLambertMaterial({ color, flatShading: true });
  patchPS1(material);
  litCache.set(color, material);
  return material;
}

export function basic(color: number, opacity = 1): MeshBasicMaterial {
  const material = new MeshBasicMaterial({
    color,
    transparent: opacity < 1,
    opacity,
    depthWrite: opacity >= 1,
  });
  patchPS1(material);
  return material;
}

const BLIT_VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const BLIT_FRAG = `
uniform sampler2D tDiffuse;
uniform vec2 uSize;
varying vec2 vUv;

float bayer4(vec2 p) {
  float x = mod(floor(p.x), 4.0);
  float y = mod(floor(p.y), 4.0);
  if (y < 0.5) {
    if (x < 0.5) return 0.0;
    if (x < 1.5) return 8.0;
    if (x < 2.5) return 2.0;
    return 10.0;
  }
  if (y < 1.5) {
    if (x < 0.5) return 12.0;
    if (x < 1.5) return 4.0;
    if (x < 2.5) return 14.0;
    return 6.0;
  }
  if (y < 2.5) {
    if (x < 0.5) return 3.0;
    if (x < 1.5) return 11.0;
    if (x < 2.5) return 1.0;
    return 9.0;
  }
  if (x < 0.5) return 15.0;
  if (x < 1.5) return 7.0;
  if (x < 2.5) return 13.0;
  return 5.0;
}

void main() {
  vec2 texel = floor(clamp(vUv, 0.0, 0.999) * uSize);
  vec3 col = texture2D(tDiffuse, (texel + 0.5) / uSize).rgb;
  float d = bayer4(texel) / 16.0 - 0.5;
  float levels = 24.0;
  col = clamp(floor(col * levels + d * 0.9 + 0.5) / levels, 0.0, 1.0);
  gl_FragColor = linearToOutputTexel(vec4(col, 1.0));
}
`;

export function createBlit(): {
  scene: Scene;
  camera: OrthographicCamera;
  material: ShaderMaterial;
  setSize: (w: number, h: number) => void;
} {
  const size = new Vector2(480, 270);
  const material = new ShaderMaterial({
    uniforms: {
      tDiffuse: { value: null as Texture | null },
      uSize: { value: size },
    },
    vertexShader: BLIT_VERT,
    fragmentShader: BLIT_FRAG,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  });
  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const mesh = new Mesh(new PlaneGeometry(2, 2), material);
  mesh.frustumCulled = false;
  scene.add(mesh);
  return {
    scene,
    camera,
    material,
    setSize(w: number, h: number) {
      size.set(w, h);
    },
  };
}
