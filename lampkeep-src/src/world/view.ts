import {
  AnimationMixer,
  BoxGeometry,
  BufferGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  Fog,
  Group,
  HemisphereLight,
  DirectionalLight,
  Mesh,
  MeshLambertMaterial,
  PointLight,
  Scene,
  SphereGeometry,
  type AnimationAction,
  type Object3D,
} from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { patchPS1 } from "../render/pixelate";
import { BRAZIERS, STONES, THICKET } from "./level";
import type { Valley } from "./valley";

const FOG = new Color(0x8b9994);

function mat(color: number, emissive = 0): MeshLambertMaterial {
  const material = new MeshLambertMaterial({ color, emissive, flatShading: true });
  patchPS1(material);
  return material;
}

function box(w: number, h: number, d: number, x: number, y: number, z: number, color: number): Mesh {
  const mesh = new Mesh(new BoxGeometry(w, h, d), mat(color));
  mesh.position.set(x, y + h / 2, z);
  return mesh;
}

export interface ValleyView {
  scene: Scene;
  update(sim: Valley, dt: number): void;
}

export function buildView(): ValleyView {
  const scene = new Scene();
  scene.background = FOG;
  scene.fog = new Fog(FOG, 12, 90);
  scene.add(new HemisphereLight(0xc5d4c8, 0x3a3328, 1.15));
  const sun = new DirectionalLight(0xfff1d2, 1.1);
  sun.position.set(-20, 40, 10);
  scene.add(sun);

  const groundBits = simBoxes();
  if (groundBits) {
    const ground = new Mesh(groundBits, mat(0x6d7a48));
    scene.add(ground);
  }
  const stones = STONES.map((stone) => {
    const mesh = box(1.7, 0.45, 1.7, stone.x, stone.y - 0.2, stone.z, 0x8d8374);
    mesh.visible = false;
    scene.add(mesh);
    return mesh;
  });
  const braziers = BRAZIERS.map((brazier) => {
    const group = new Group();
    group.position.set(brazier.x, brazier.y, brazier.z);
    const bowl = new Mesh(new CylinderGeometry(0.7, 0.85, 0.7, 6), mat(0x5c564c));
    bowl.position.y = 0.35;
    const flame = new Mesh(new ConeGeometry(0.28, 0.7, 5), mat(0xff8a2a, 0xff6a1a));
    flame.position.y = 0.95;
    flame.visible = false;
    group.add(bowl, flame);
    scene.add(group);
    return { flame, group };
  });

  const trees = treeField();
  scene.add(trees);
  scene.add(camp());
  const spire = spireMesh();
  scene.add(spire);
  const gatewick = makeGatewick();
  scene.add(gatewick.group);

  const critters = Array.from({ length: 6 }, () => {
    const mesh = new Mesh(new SphereGeometry(0.22, 5, 4), mat(0xc4b48a));
    scene.add(mesh);
    return mesh;
  });
  const wisps = Array.from({ length: 3 }, () => {
    const mesh = new Mesh(new SphereGeometry(0.28, 6, 5), mat(0x9fd6ff, 0x77c4ff));
    scene.add(mesh);
    return mesh;
  });
  const sprites = Array.from({ length: 3 }, () => {
    const mesh = new Mesh(new ConeGeometry(0.35, 0.9, 4), mat(0x6a3d28));
    scene.add(mesh);
    return mesh;
  });

  const lamp = new PointLight(0xffc56a, 0, 8, 2);
  scene.add(lamp);
  const hero = new Group();
  scene.add(hero);
  let mixer: AnimationMixer | null = null;
  let clips: Record<string, AnimationAction> = {};
  let current = "";
  const fallback = box(0.7, 1.5, 0.45, 0, 0, 0, 0x2f6b3a);
  fallback.position.set(0, 0.75, 0);
  hero.add(fallback);
  const loader = new GLTFLoader();
  loader.load(
    `${import.meta.env.BASE_URL}models/lampkeep.glb`,
    (gltf) => {
      const model = gltf.scene;
      model.scale.setScalar(0.72);
      model.traverse((obj: Object3D) => {
        const mesh = obj as Mesh;
        if (!mesh.isMesh) return;
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const material of materials) {
          const colored = material as MeshLambertMaterial;
          if (colored.color) colored.color.multiply(new Color(0.82, 1, 0.86));
          patchPS1(colored);
        }
      });
      hero.add(model);
      fallback.visible = false;
      mixer = new AnimationMixer(model);
      for (const clip of gltf.animations) clips[clip.name] = mixer.clipAction(clip);
      play("Idle");
    },
    undefined,
    () => {
      fallback.visible = true;
    },
  );

  function play(name: string): void {
    if (!clips[name] || current === name) return;
    const next = clips[name];
    if (!next) return;
    const prev = clips[current];
    current = name;
    next.reset().fadeIn(0.15).play();
    prev?.fadeOut(0.15);
  }

  return {
    scene,
    update(sim, dt) {
      hero.position.set(sim.player.x, sim.player.y, sim.player.z);
      hero.rotation.y = sim.player.yaw;
      const speed = Math.hypot(sim.player.vx, sim.player.vz);
      if (!sim.player.grounded) play("Jump_Full_Short");
      else if (speed > 4.2) play("Running_A");
      else if (speed > 0.4) play("Walking_A");
      else play("Idle");
      mixer?.update(dt);
      lamp.position.set(sim.player.x, sim.player.y + 1.1, sim.player.z);
      lamp.intensity = sim.lampRaised ? 2.4 : 0.35;
      stones.forEach((mesh, i) => {
        mesh.visible = Boolean(sim.stones[i]?.solid);
      });
      braziers.forEach((entry, i) => {
        const id = BRAZIERS[i]!.id;
        const on = sim.lit.has(id);
        entry.flame.visible = on || sim.hintId() === id;
        const pulse = sim.hintId() === id ? 1 + Math.sin(sim.time * 8) * 0.15 : 1;
        entry.group.scale.setScalar(pulse);
      });
      sim.critters.forEach((critter, i) => {
        const mesh = critters[i];
        if (!mesh) return;
        mesh.position.set(critter.x, 0.3, critter.z);
      });
      sim.wisps.forEach((wisp, i) => {
        const mesh = wisps[i];
        if (!mesh) return;
        mesh.visible = wisp.awake || Math.hypot(wisp.x - sim.player.x, wisp.z - sim.player.z) < 18;
        mesh.position.set(wisp.x, 1.5 + Math.sin(sim.time * 2 + i) * 0.15, wisp.z);
      });
      sim.sprites.forEach((sprite, i) => {
        const mesh = sprites[i];
        if (!mesh) return;
        mesh.visible = sprite.enabled && !sprite.dispelled;
        mesh.position.set(sprite.x, THICKET.y0 + 0.6, sprite.z);
      });
      const kneel = sim.woken ? 1.2 : 0;
      gatewick.group.position.y = 40 - kneel;
      gatewick.group.rotation.y = sim.gateYaw;
      const wickMat = gatewick.wick.material as MeshLambertMaterial;
      wickMat.color.setHex(sim.woken ? 0xffd27a : 0x4a4038);
      wickMat.emissive.setHex(sim.woken ? 0xffb347 : 0xcc6a18);
    },
  };
}

function simBoxes() {
  const geoms: BufferGeometry[] = [];
  const add = (w: number, h: number, d: number, x: number, y: number, z: number) => {
    const geo = new BoxGeometry(w, h, d);
    geo.translate(x, y + h / 2, z);
    geoms.push(geo);
  };
  add(28, 0.4, 28, 0, -0.4, 8);
  add(30, 0.4, 24, 8, 1.6, 40);
  add(70, 0.4, 56, -6, 3.6, 90);
  add(24, 0.4, 20, 32, 1.6, 120);
  add(30, 0.4, 22, -8, 25.6, 154);
  add(32, 0.5, 28, 0, 39.5, 190);
  add(8, 6, 8, 0, 44, 240);
  for (let i = 0; i < 8; i++) add(3.2, 8 + i * 6, 3.2, 0, 50 + i * 6, 240);
  return geoms.length ? mergeGeometries(geoms) : null;
}

function treeField(): Group {
  const group = new Group();
  const spots = [
    [-16, 0, 4], [14, 0, 2], [-24, 10, 58], [28, 2, 48], [-36, 4, 90],
    [26, 4, 100], [-18, 4, 108], [8, 26, 160], [16, 40, 186], [-18, 40, 188],
  ];
  for (const [x, y, z] of spots) {
    const trunk = new Mesh(new CylinderGeometry(0.2, 0.28, 1.2, 5), mat(0x5a4030));
    trunk.position.set(x ?? 0, (y ?? 0) + 0.6, z ?? 0);
    const top = new Mesh(new ConeGeometry(1.3, 2.4, 6), mat(0x2f6a34));
    top.position.set(x ?? 0, (y ?? 0) + 2.2, z ?? 0);
    group.add(trunk, top);
  }
  return group;
}

function camp(): Group {
  const group = new Group();
  const tent = new Mesh(new ConeGeometry(2.2, 2.2, 4), mat(0x8a7a52));
  tent.position.set(-30, 5.2, 74);
  const book = box(0.6, 0.12, 0.45, -28, 4.2, 80, 0x6a3a22);
  group.add(tent, book);
  return group;
}

function spireMesh(): Mesh {
  const mesh = new Mesh(new ConeGeometry(6, 48, 5), mat(0x7d8c86));
  mesh.position.set(0, 64, 230);
  mesh.material.fog = false;
  return mesh;
}

function makeGatewick(): { group: Group; wick: Mesh } {
  const group = new Group();
  group.position.set(0, 40, 193);
  const stone = mat(0xb7b1a6);
  const body = new Mesh(new BoxGeometry(3.4, 3.6, 2.4), stone);
  body.position.y = 3.3;
  const head = new Mesh(new BoxGeometry(2, 1.7, 1.8), stone);
  head.position.y = 5.8;
  const eyeMat = mat(0xffc14a, 0xff9a1a);
  const eyeL = new Mesh(new BoxGeometry(0.42, 0.28, 0.12), eyeMat);
  const eyeR = eyeL.clone();
  eyeL.position.set(-0.45, 5.9, 0.9);
  eyeR.position.set(0.45, 5.9, 0.9);
  const wick = new Mesh(new BoxGeometry(0.34, 1.3, 0.34), mat(0x6a5648, 0xff7a22));
  wick.position.set(0, 7.2, 0);
  const crack = new Mesh(new BoxGeometry(0.16, 1.4, 0.08), mat(0xff9a3c, 0xcc6a18));
  crack.position.set(0.2, 3.3, 1.12);
  crack.rotation.z = 0.4;
  const armL = new Mesh(new BoxGeometry(0.7, 2.2, 0.7), stone);
  const armR = armL.clone();
  armL.position.set(-2, 3.4, 0);
  armR.position.set(2, 3.4, 0);
  const legL = new Mesh(new BoxGeometry(0.9, 1.6, 0.9), stone);
  const legR = legL.clone();
  legL.position.set(-0.7, 0.8, 0);
  legR.position.set(0.7, 0.8, 0);
  group.add(body, head, eyeL, eyeR, wick, crack, armL, armR, legL, legR);
  return { group, wick };
}
