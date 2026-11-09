import type { PerspectiveCamera } from "three";
import { dampAngle, lerp } from "../util/math";

export interface Collider {
  x: number;
  y: number;
  z: number;
  r: number;
}

export interface RigTarget {
  cameraYaw: number;
  cameraPitch: number;
  player: { x: number; y: number; z: number };
}

function pullIn(
  ox: number, oy: number, oz: number,
  cx: number, cy: number, cz: number,
  spheres: Collider[],
): { x: number; y: number; z: number } {
  const dx = cx - ox;
  const dy = cy - oy;
  const dz = cz - oz;
  const len = Math.hypot(dx, dy, dz) || 1;
  const dirx = dx / len;
  const diry = dy / len;
  const dirz = dz / len;
  let maxT = len;
  for (const s of spheres) {
    const lx = ox - s.x;
    const ly = oy - s.y;
    const lz = oz - s.z;
    const b = lx * dirx + ly * diry + lz * dirz;
    const c = lx * lx + ly * ly + lz * lz - s.r * s.r;
    if (c <= 0) {
      maxT = Math.min(maxT, 1.7);
      continue;
    }
    const disc = b * b - c;
    if (disc < 0 || b > 0) continue;
    const t = -b - Math.sqrt(disc);
    if (t > 0.15 && t < maxT) maxT = t - 0.18;
  }
  maxT = Math.max(1.7, maxT);
  return { x: ox + dirx * maxT, y: oy + diry * maxT, z: oz + dirz * maxT };
}

export class FollowCamera {
  sway = 0;
  snap = true;

  constructor(private readonly camera: PerspectiveCamera) {}

  update(sim: RigTarget, colliders: Collider[], dt: number): void {
    const yaw = sim.cameraYaw + this.sway;
    const pitch = sim.cameraPitch;
    const dist = 4.6;
    const horiz = Math.cos(pitch) * dist;
    const lift = Math.sin(pitch) * dist;
    const px = sim.player.x;
    const py = sim.player.y;
    const pz = sim.player.z;
    const desiredX = px - Math.sin(yaw) * horiz;
    const desiredY = py + 1.8 + lift;
    const desiredZ = pz - Math.cos(yaw) * horiz;
    const placed = pullIn(px, py + 1.2, pz, desiredX, desiredY, desiredZ, colliders);
    const k = this.snap ? 1 : 1 - Math.exp(-10 * dt);
    this.snap = false;
    this.camera.position.x = lerp(this.camera.position.x, placed.x, k);
    this.camera.position.y = lerp(this.camera.position.y, placed.y, k);
    this.camera.position.z = lerp(this.camera.position.z, placed.z, k);
    this.camera.lookAt(px, py + 1.2, pz);
  }

  dampSway(target: number, dt: number): void {
    this.sway = dampAngle(this.sway, target, 2, dt);
  }
}
