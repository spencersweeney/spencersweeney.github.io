import {
  BufferGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DodecahedronGeometry,
  DoubleSide,
  Euler,
  Float32BufferAttribute,
  FogExp2,
  Group,
  IcosahedronGeometry,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PlaneGeometry,
  PointLight,
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
  Quaternion,
  RingGeometry,
  Scene,
  SphereGeometry,
  Vector3,
  type BufferAttribute,
} from "three";
import type { TelegraphStyle } from "../content/assists";
import type { Collider } from "../camera/FollowCamera";
import { basic, lit, patchPS1 } from "../render/pixelate";
import { cloakTexture, dirtTexture, grassTexture } from "../render/textures";
import { blip } from "../render/sfx";
import { ARENA, GATE_SHRINE, PILLARS, TRAIL_SHRINE, pathCenterX } from "./checkpoints";
import type { EnemyKind, EnemyState } from "./types";
import type { MistRoad } from "./MistRoadLevel";

const FOG = 0x8b9994;

interface Part {
  geo: BufferGeometry;
  x: number;
  y: number;
  z: number;
  sx?: number;
  sy?: number;
  sz?: number;
  rx?: number;
  ry?: number;
  rz?: number;
  color: number;
}

function mergeParts(parts: Part[]): BufferGeometry {
  const positions: number[] = [];
  const colors: number[] = [];
  const v = new Vector3();
  const m = new Matrix4();
  const q = new Quaternion();
  const p = new Vector3();
  const s = new Vector3();
  const c = new Color();
  for (const part of parts) {
    const src = part.geo.index ? part.geo.toNonIndexed() : part.geo;
    const attr = src.getAttribute("position") as BufferAttribute;
    c.set(part.color);
    p.set(part.x, part.y, part.z);
    s.set(part.sx ?? 1, part.sy ?? 1, part.sz ?? 1);
    q.setFromEuler(new Euler(part.rx ?? 0, part.ry ?? 0, part.rz ?? 0));
    m.compose(p, q, s);
    for (let i = 0; i < attr.count; i++) {
      v.fromBufferAttribute(attr, i).applyMatrix4(m);
      positions.push(v.x, v.y, v.z);
      colors.push(c.r, c.g, c.b);
    }
  }
  const geo = new BufferGeometry();
  geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geo.setAttribute("color", new Float32BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  return geo;
}

function sector(range: number, fullDeg: number): BufferGeometry {
  const half = ((fullDeg * Math.PI) / 180) / 2;
  const steps = 7;
  const pos = [0, 0.07, 0];
  for (let i = 0; i <= steps; i++) {
    const a = -half + (i / steps) * half * 2;
    pos.push(Math.sin(a) * range, 0.07, Math.cos(a) * range);
  }
  const idx: number[] = [];
  for (let i = 1; i <= steps; i++) idx.push(0, i, i + 1);
  const geo = new BufferGeometry();
  geo.setAttribute("position", new Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

function palette(style: TelegraphStyle): { fill: number; edge: number } {
  if (style === "high") return { fill: 0xffe14a, edge: 0x141414 };
  if (style === "colorblind") return { fill: 0x2f6bff, edge: 0xff8a1e };
  return { fill: 0xff3b2f, edge: 0x6e120c };
}

function hash(n: number): number {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

export interface LampView {
  scene: Scene;
  colliders: Collider[];
  update(sim: MistRoad, viewTime: number, reduced: boolean): void;
}

export function buildView(): LampView {
  const scene = new Scene();
  scene.background = new Color(FOG);
  scene.fog = new FogExp2(FOG, 0.032);

  scene.add(new HemisphereLight(0xb7c4bc, 0x3c4a30, 0.55));
  scene.add(new AmbientLight(0x6e7c76, 0.45));
  const sun = new DirectionalLight(0xd5e2da, 1.35);
  sun.position.set(12, 22, -8);
  scene.add(sun);

  const grass = grassTexture();
  grass.repeat.set(22, 16);
  const dirt = dirtTexture();
  dirt.repeat.set(1, 1);
  const grassMat = new MeshLambertMaterial({ map: grass, flatShading: true });
  const dirtMat = new MeshLambertMaterial({ map: dirt, flatShading: true });
  patchPS1(grassMat);
  patchPS1(dirtMat);
  const ground = new Mesh(new PlaneGeometry(170, 130), grassMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.z = 34;
  scene.add(ground);
  scene.add(new Mesh(buildPath(), dirtMat));

  const propsMat = new MeshLambertMaterial({ vertexColors: true, flatShading: true });
  patchPS1(propsMat);
  const built = buildProps();
  scene.add(new Mesh(built.geo, propsMat));

  const gateLight = new PointLight(0xffb15a, 0, 14, 1.4);
  gateLight.position.set(0, 4.2, 63);
  scene.add(gateLight);
  const shrineA = new PointLight(0xff9a3a, 3.5, 7, 1.6);
  shrineA.position.set(TRAIL_SHRINE.x, 1.4, TRAIL_SHRINE.z);
  const shrineB = shrineA.clone();
  shrineB.position.set(GATE_SHRINE.x, 1.4, GATE_SHRINE.z);
  scene.add(shrineA, shrineB);

  const player = buildPlayer();
  scene.add(player);

  const actors = new Map<string, Group>();
  const seenTelegraph = new Map<string, string>();
  const colliders = built.colliders;

  function ensure(e: EnemyState): Group {
    let group = actors.get(e.id);
    if (!group) {
      group = buildEnemy(e.kind);
      actors.set(e.id, group);
      scene.add(group);
    }
    return group;
  }

  return {
    scene,
    colliders,
    update(sim, viewTime, reduced) {
      const bob = reduced ? 0 : Math.sin(viewTime * 8);
      updatePlayer(player, sim, bob);
      const style = sim.assists.telegraphStyle;
      const colors = palette(style);
      const ids = new Set(sim.enemies.map((e) => e.id));
      for (const [id, group] of actors) {
        if (!ids.has(id)) {
          scene.remove(group);
          actors.delete(id);
        }
      }
      for (const e of sim.enemies) {
        const group = ensure(e);
        group.visible = e.alive;
        if (!e.alive) continue;
        group.position.set(e.x, e.y, e.z);
        const body = group.userData.body as Group;
        body.rotation.y = e.yaw;
        if (e.kind === "gorse") body.position.y = Math.abs(Math.sin(e.hop)) * 0.22;
        if (e.kind === "wisp") body.position.y = Math.sin(viewTime * 3 + e.homeZ) * 0.08;
        if (e.kind === "gatewick") body.position.y = Math.sin(viewTime * 1.4) * 0.06;
        const prev = group.userData.hp as number | undefined;
        if (prev !== undefined && e.hp < prev) group.userData.flash = 0.12;
        group.userData.hp = e.hp;
        const flash = (group.userData.flash as number) ?? 0;
        if (flash > 0) group.userData.flash = Math.max(0, flash - 0.016);
        const punch = 1 + Math.max(0, flash) * 1.4;
        body.scale.setScalar(e.kind === "gatewick" ? punch : punch);
        showTelegraph(group, e, colors, viewTime, reduced);
        const sig = `${e.telegraphShape}:${e.ring}:${Math.round(e.windTotal * 100)}`;
        if (e.telegraphShape !== "none" && seenTelegraph.get(e.id) !== sig) {
          blip(e.kind === "gatewick" ? 180 : e.kind === "wisp" ? 620 : 360, 0.09, 0.03);
        }
        if (e.telegraphShape === "none") seenTelegraph.delete(e.id);
        else seenTelegraph.set(e.id, sig);
      }
      const boss = sim.enemies.find((e) => e.kind === "gatewick");
      const bossLight = player.userData.bossLight as PointLight | undefined;
      if (boss && boss.alive && sim.bossFight) {
        if (!bossLight) {
          const light = new PointLight(0xff5a18, 8, 9, 1.5);
          light.position.set(0, 2.2, 56);
          scene.add(light);
          player.userData.bossLight = light;
        }
      }
      gateLight.intensity = sim.outcome === "clear" ? 14 : 0.4;
      const hurt = sim.player.hurtT;
      player.visible = reduced || hurt <= 0 || Math.floor(hurt * 6) % 2 === 0;
    },
  };
}

function buildPath(): BufferGeometry {
  const steps = 96;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const z = -4 + (70 * i) / steps;
    const cx = pathCenterX(Math.max(0, Math.min(64, z)));
    const y = 0.03;
    positions.push(cx - 2.35, y, z, cx + 2.35, y, z);
    uvs.push(0, i * 0.45, 1, i * 0.45);
  }
  for (let i = 0; i < steps; i++) {
    const a = i * 2;
    indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
  }
  const geo = new BufferGeometry();
  geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geo.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function buildProps(): { geo: BufferGeometry; colliders: Collider[] } {
  const cyl = new CylinderGeometry(1, 1, 1, 6).toNonIndexed();
  const cone = new ConeGeometry(1, 1, 6).toNonIndexed();
  const ico = new IcosahedronGeometry(1, 0).toNonIndexed();
  const sphere = new SphereGeometry(1, 6, 5).toNonIndexed();
  const box = new CylinderGeometry(0.2, 0.55, 1, 5).toNonIndexed();
  const parts: Part[] = [];
  const colliders: Collider[] = [];

  for (let i = 0; i < 16; i++) {
    const z = -2 + i * 4.6;
    const cx = pathCenterX(Math.max(0, Math.min(60, z)));
    const side = i % 2 === 0 ? -1 : 1;
    const x = cx + side * (6.2 + hash(i) * 2.4);
    const h = 1.6 + hash(i + 3) * 1.8;
    parts.push({
      geo: sphere,
      x,
      y: h * 0.15,
      z,
      sx: 3.2 + hash(i + 1),
      sy: h,
      sz: 2.6 + hash(i + 2),
      color: i % 4 === 0 ? 0x6a675e : 0x314a2c,
    });
  }

  for (let i = 0; i < 14; i++) {
    const z = 1 + i * 4.8;
    const cx = pathCenterX(Math.max(0, Math.min(62, z)));
    for (const side of [-1, 1]) {
      if (hash(i * 2 + side + 8) < 0.25) continue;
      const x = cx + side * (3.35 + hash(i + side * 5) * 0.8);
      const h = 2.4 + hash(i + 4) * 1.6;
      parts.push({ geo: cyl, x, y: 0.45, z, sx: 0.12, sy: 0.9, sz: 0.12, color: 0x5a3e28 });
      parts.push({ geo: cone, x, y: 1.15, z, sx: 0.85, sy: h * 0.45, sz: 0.85, color: 0x234a28 });
      parts.push({ geo: cone, x, y: 1.85, z, sx: 0.62, sy: h * 0.4, sz: 0.62, color: 0x2f6234 });
      parts.push({ geo: cone, x, y: 2.45, z, sx: 0.38, sy: h * 0.32, sz: 0.38, color: 0x3c7040 });
      colliders.push({ x, y: 1.4, z, r: 0.7 });
    }
  }

  for (let i = 0; i < 10; i++) {
    const z = 4 + i * 6.2;
    const cx = pathCenterX(Math.max(0, Math.min(60, z)));
    const side = hash(i + 20) > 0.5 ? 1 : -1;
    const x = cx + side * (2.7 + hash(i + 21) * 1.5);
    parts.push({
      geo: ico,
      x,
      y: 0.28,
      z,
      sx: 0.45 + hash(i),
      sy: 0.32,
      sz: 0.4,
      ry: hash(i) * 3,
      color: 0x7a756c,
    });
  }

  // Spire, stepped and mossy, behind the gate.
  let y = 0;
  const radii = [3.1, 2.5, 2.15, 1.7, 1.45, 1.15, 0.9, 0.62, 0.4, 0.18];
  for (let i = 0; i < radii.length; i++) {
    const h = i === radii.length - 1 ? 2.2 : 2.6;
    const jitter = (hash(i + 40) - 0.5) * 0.35;
    parts.push({
      geo: box,
      x: jitter,
      y: y + h / 2,
      z: 74,
      sx: radii[i] * 1.6,
      sy: h,
      sz: radii[i] * 1.6,
      ry: i * 0.4,
      color: i % 2 === 0 ? 0x6a6e68 : 0x3f6244,
    });
    y += h * 0.82;
  }
  colliders.push({ x: 0, y: 4, z: 72, r: 3.2 });

  // Gate façade.
  parts.push({ geo: cyl, x: -2.2, y: 2.4, z: 63.2, sx: 0.55, sy: 4.8, sz: 0.55, color: 0x6c7068 });
  parts.push({ geo: cyl, x: 2.2, y: 2.4, z: 63.2, sx: 0.55, sy: 4.8, sz: 0.55, color: 0x626860 });
  parts.push({ geo: box, x: 0, y: 4.7, z: 63.2, sx: 3.2, sy: 0.7, sz: 0.7, color: 0x5c615c });
  parts.push({ geo: cone, x: 0, y: 6.3, z: 63.2, sx: 1.3, sy: 2.2, sz: 0.8, color: 0x4e6a48 });

  for (const pillar of PILLARS) {
    parts.push({
      geo: cyl,
      x: pillar.x,
      y: 1.6,
      z: pillar.z,
      sx: pillar.r,
      sy: 3.2,
      sz: pillar.r,
      color: 0x6a6e68,
    });
    parts.push({
      geo: cyl,
      x: pillar.x,
      y: 3.3,
      z: pillar.z,
      sx: pillar.r * 1.25,
      sy: 0.28,
      sz: pillar.r * 1.25,
      color: 0x7c7568,
    });
    colliders.push({ x: pillar.x, y: 1.6, z: pillar.z, r: pillar.r + 0.25 });
  }

  addShrine(parts, TRAIL_SHRINE.x, TRAIL_SHRINE.z);
  addShrine(parts, GATE_SHRINE.x, GATE_SHRINE.z);

  // Arena floor reads as stone.
  parts.push({
    geo: new CylinderGeometry(1, 1, 1, 10).toNonIndexed(),
    x: ARENA.x,
    y: 0.02,
    z: ARENA.z,
    sx: 8.2,
    sy: 0.08,
    sz: 8.2,
    color: 0x5c605c,
  });

  return { geo: mergeParts(parts), colliders };
}

function addShrine(parts: Part[], x: number, z: number): void {
  const cyl = new CylinderGeometry(1, 1, 1, 7).toNonIndexed();
  const box = new CylinderGeometry(0.15, 0.15, 1, 4).toNonIndexed();
  parts.push({ geo: cyl, x, y: 0.28, z, sx: 0.7, sy: 0.5, sz: 0.7, color: 0x6e6a62 });
  parts.push({ geo: box, x: x - 0.28, y: 0.85, z, sx: 1, sy: 0.7, sz: 1, color: 0x6a4a2c });
  parts.push({ geo: box, x: x + 0.28, y: 0.85, z, sx: 1, sy: 0.7, sz: 1, color: 0x6a4a2c });
  parts.push({ geo: box, x, y: 1.25, z, sx: 2.6, sy: 0.7, sz: 1, rx: Math.PI / 2, color: 0x7a5a34 });
}

function buildPlayer(): Group {
  const group = new Group();
  const cloakGeo = new CylinderGeometry(0.22, 0.52, 1.2, 7);
  const cloakMat = new MeshLambertMaterial({ map: cloakTexture(), flatShading: true });
  patchPS1(cloakMat);
  const cloak = new Mesh(cloakGeo, cloakMat);
  cloak.position.y = 0.75;
  const head = new Mesh(new CylinderGeometry(0.16, 0.18, 0.28, 6), lit(0xc4a07c));
  head.position.y = 1.48;
  const hair = new Mesh(new CylinderGeometry(0.18, 0.2, 0.16, 6), lit(0x5a3826));
  hair.position.y = 1.66;
  const legL = new Mesh(new CylinderGeometry(0.07, 0.08, 0.32, 5), lit(0x4a3424));
  legL.position.set(-0.12, 0.16, 0.02);
  const legR = new Mesh(new CylinderGeometry(0.07, 0.08, 0.32, 5), lit(0x4a3424));
  legR.position.set(0.12, 0.16, -0.02);
  const arm = new Group();
  arm.position.set(0.5, 0.92, 0.18);
  const armMesh = new Mesh(new CylinderGeometry(0.06, 0.07, 0.34, 5), lit(0x2a4e30));
  armMesh.position.y = -0.12;
  const lantern = new Group();
  lantern.position.set(0.1, -0.22, 0.28);
  const housing = new Mesh(new CylinderGeometry(0.1, 0.11, 0.22, 5), lit(0x2a241c));
  const glow = new Mesh(new CylinderGeometry(0.055, 0.055, 0.1, 5), basic(0xffc56a));
  glow.position.z = 0.06;
  lantern.add(housing, glow);
  const lamp = new PointLight(0xffb060, 22, 9, 1.6);
  lamp.position.y = 0.02;
  lantern.add(lamp);
  arm.add(armMesh, lantern);
  const beamMat = basic(0xffc56a, 0.13);
  beamMat.side = DoubleSide;
  const beam = new Mesh(new ConeGeometry(0.45, 3.4, 6, 1, true), beamMat);
  beam.rotation.x = Math.PI / 2;
  beam.position.set(0.36, 0.7, 1.55);
  group.add(cloak, head, hair, legL, legR, arm, beam);
  group.userData = { legL, legR, arm, cloak, beam };
  return group;
}

function buildEnemy(kind: EnemyKind): Group {
  const group = new Group();
  const body = new Group();
  if (kind === "gorse") {
    body.add(mesh(new IcosahedronGeometry(0.46, 0), lit(0x2f6a32), 0, 0.48, 0));
    body.add(mesh(new IcosahedronGeometry(0.32, 0), lit(0x3f7a3a), 0.24, 0.62, 0.08));
    body.add(mesh(new IcosahedronGeometry(0.28, 0), lit(0x245628), -0.2, 0.55, -0.06));
  } else if (kind === "wisp") {
    body.add(mesh(new IcosahedronGeometry(0.28, 0), basic(0xe8fbff), 0, 0, 0));
    const shell = mesh(new IcosahedronGeometry(0.46, 0), basic(0x9fd6ff, 0.4), 0, 0, 0);
    body.add(shell);
    const light = new PointLight(0xcfe8ff, 4, 4, 2);
    body.add(light);
  } else {
    const rock = new DodecahedronGeometry(1.15, 0);
    const cracked = paintCracks(rock);
    const mat = new MeshLambertMaterial({ vertexColors: true, flatShading: true });
    patchPS1(mat);
    const torso = new Mesh(cracked, mat);
    torso.scale.set(1.25, 1.45, 1.05);
    torso.position.y = 1.7;
    body.add(torso);
    body.add(mesh(new ConeGeometry(0.5, 1.15, 5), lit(0x7c8286), 0, 3.15, 0));
    const armL = mesh(new DodecahedronGeometry(0.48, 0), lit(0x646a6e), -1.35, 1.85, 0.15);
    armL.scale.set(0.75, 1.35, 0.65);
    const armR = mesh(new DodecahedronGeometry(0.48, 0), lit(0x646a6e), 1.4, 1.7, -0.1);
    armR.scale.set(0.7, 1.2, 0.6);
    body.add(armL, armR);
    const vein = basic(0xff5414);
    const cracks: [number, number, number, number, number, number][] = [
      [0.2, 1.9, 0.7, 0.05, 0.9, 0.05],
      [-0.45, 1.55, 0.55, 0.7, 0.05, 0.05],
      [0.35, 2.35, 0.45, 0.05, 0.55, 0.05],
      [-0.1, 1.25, -0.2, 0.04, 0.6, 0.05],
    ];
    for (const [x, y, z, sx, sy, sz] of cracks) {
      const m = new Mesh(new CylinderGeometry(1, 1, 1, 4), vein);
      m.position.set(x, y, z);
      m.scale.set(sx, sy, sz);
      m.rotation.z = x;
      body.add(m);
    }
    const light = new PointLight(0xff5a18, 6, 6, 1.8);
    light.position.set(0, 1.8, 0.4);
    body.add(light);
  }
  group.add(body);
  const disk = new Mesh(new SphereGeometry(1, 10, 2), basic(0xff3b2f, 0.33));
  disk.scale.set(1, 0.02, 1);
  const ring = new Mesh(new RingGeometry(0.86, 1, 18), basic(0x6e120c, 0.95));
  ring.rotation.x = -Math.PI / 2;
  const cone = new Mesh(sector(1, 60), basic(0xff3b2f, 0.38));
  const coneWide = new Mesh(sector(1, 90), basic(0xff3b2f, 0.38));
  for (const m of [disk, ring, cone, coneWide]) {
    m.visible = false;
    group.add(m);
  }
  group.userData = { body, disk, ring, cone, coneWide, hp: -1, flash: 0 };
  return group;
}

function mesh(geo: BufferGeometry, material: MeshLambertMaterial | MeshBasicMaterial, x: number, y: number, z: number): Mesh {
  const m = new Mesh(geo, material);
  m.position.set(x, y, z);
  return m;
}

function paintCracks(source: BufferGeometry): BufferGeometry {
  const geo = source.toNonIndexed();
  const pos = geo.getAttribute("position");
  const colors = new Float32Array(pos.count * 3);
  const stone = new Color(0x6a6e74);
  const hot = new Color(0xff4d14);
  for (let i = 0; i < pos.count; i += 3) {
    let crack = false;
    for (let k = 0; k < 3; k++) {
      const x = pos.getX(i + k);
      const y = pos.getY(i + k);
      if (Math.abs(Math.sin(x * 3.1 + y * 5.4)) > 0.94) crack = true;
    }
    const c = crack ? hot : stone;
    for (let k = 0; k < 3; k++) {
      colors[(i + k) * 3] = c.r;
      colors[(i + k) * 3 + 1] = c.g;
      colors[(i + k) * 3 + 2] = c.b;
    }
  }
  geo.setAttribute("color", new Float32BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  return geo;
}

function showTelegraph(
  group: Group,
  e: EnemyState,
  colors: { fill: number; edge: number },
  time: number,
  reduced: boolean,
): void {
  const disk = group.userData.disk as Mesh;
  const ring = group.userData.ring as Mesh;
  const cone = group.userData.cone as Mesh;
  const coneWide = group.userData.coneWide as Mesh;
  const on = e.telegraphShape !== "none";
  const pulse = reduced ? 0.85 : 0.55 + Math.abs(Math.sin(time * 14)) * 0.45;
  disk.visible = on && e.telegraphShape === "circle";
  ring.visible = disk.visible;
  cone.visible = on && e.telegraphShape === "cone" && e.telegraphCone <= 70;
  coneWide.visible = on && e.telegraphShape === "cone" && e.telegraphCone > 70;
  const ox = e.markX - e.x;
  const oz = e.markZ - e.z;
  if (disk.visible) {
    disk.position.set(ox, 0.08, oz);
    ring.position.set(ox, 0.1, oz);
    const r = e.telegraphR;
    disk.scale.set(r, 0.04, r);
    ring.scale.setScalar(r);
    paint(disk, colors.fill, pulse * 0.55);
    paint(ring, colors.edge, 0.95);
  }
  const active = cone.visible ? cone : coneWide;
  if (active.visible) {
    active.position.set(0, 0, 0);
    active.rotation.y = e.yaw;
    active.scale.setScalar(e.telegraphLen);
    paint(active, colors.fill, 0.28 + pulse * 0.35);
  }
}

function paint(target: Mesh, color: number, opacity: number): void {
  const mat = target.material as MeshBasicMaterial;
  mat.color.setHex(color);
  mat.opacity = opacity;
  mat.transparent = true;
  mat.depthWrite = false;
}

function updatePlayer(group: Group, sim: MistRoad, bob: number): void {
  const p = sim.player;
  group.position.set(p.x, p.y, p.z);
  group.rotation.y = p.yaw;
  const legL = group.userData.legL as Mesh;
  const legR = group.userData.legR as Mesh;
  const arm = group.userData.arm as Group;
  const moving = p.moving && !p.dodging;
  legL.rotation.x = moving ? bob * 0.7 : 0;
  legR.rotation.x = moving ? -bob * 0.7 : 0;
  group.position.y = p.y + (moving ? Math.abs(bob) * 0.05 : 0);
  if (p.dodging) group.rotation.z = p.dodgeDx * 0.15;
  else group.rotation.z = 0;
  const swing = p.attack.phase === "windup" ? -0.8 : p.attack.phase === "active" ? 1.1 : p.attack.phase === "recovery" ? 0.4 : 0;
  arm.rotation.x = swing;
  const beam = group.userData.beam as Mesh;
  beam.visible = p.flaring;
  const mat = beam.material as MeshBasicMaterial;
  mat.opacity = 0.28;
}
