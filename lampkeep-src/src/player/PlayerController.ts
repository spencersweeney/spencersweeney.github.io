import { clamp } from "../util/math";
import { ARENA, pathCenterX, PILLARS } from "../world/checkpoints";
import { CAPSULE_RADIUS, GRAVITY, STEP_UP } from "./Combat";

export function groundY(_x: number, _z: number): number {
  return 0;
}

export function isWalkable(x: number, z: number): boolean {
  if (z < -1.2 || z > 66) return false;
  const sampleZ = clamp(z, 0, 64);
  const cx = pathCenterX(sampleZ);
  if (Math.abs(x - cx) <= 2.2 && z <= 64.2) return true;
  const dx = x - ARENA.x;
  const dz = z - ARENA.z;
  if (dx * dx + dz * dz <= 8.35 * 8.35 && z >= 46.5) return true;
  return false;
}

function pushToWalkable(x: number, z: number): { x: number; z: number } {
  const sampleZ = clamp(z, -1, 64);
  const cx = pathCenterX(clamp(sampleZ, 0, 64));
  const half = 2.05;
  let nx = clamp(x, cx - half, cx + half);
  let nz = clamp(z, -1, 64.2);
  if (isWalkable(nx, nz)) return { x: nx, z: nz };
  const dx = x - ARENA.x;
  const dz = z - ARENA.z;
  const d = Math.hypot(dx, dz) || 1;
  const maxR = 8.05;
  if (z > 45) {
    const s = Math.min(1, maxR / d);
    return { x: ARENA.x + dx * s, z: ARENA.z + dz * s };
  }
  return { x: cx, z: nz };
}

export function resolvePosition(
  x: number,
  z: number,
  radius = CAPSULE_RADIUS,
  bossLock = false,
): { x: number; z: number } {
  let px = x;
  let pz = z;
  for (let i = 0; i < 3; i++) {
    if (!isWalkable(px, pz)) {
      const pushed = pushToWalkable(px, pz);
      px = pushed.x;
      pz = pushed.z;
    }
    for (const o of PILLARS) {
      const dx = px - o.x;
      const dz = pz - o.z;
      const d = Math.hypot(dx, dz);
      const min = o.r + radius * 0.5;
      if (d < min) {
        const s = min / (d || 1);
        px = o.x + dx * s;
        pz = o.z + dz * s;
      }
    }
    if (bossLock) {
      const dx = px - ARENA.x;
      const dz = pz - ARENA.z;
      const d = Math.hypot(dx, dz);
      const max = ARENA.r - 0.35;
      if (d > max) {
        px = ARENA.x + (dx / d) * max;
        pz = ARENA.z + (dz / d) * max;
      }
    }
  }
  return { x: px, z: pz };
}

/** Downward probe. Grounded when the feet are within 0.1 m of the ground and not rising. */
export function probeGround(y: number, vy: number, x: number, z: number): { y: number; vy: number; grounded: boolean } {
  const gy = groundY(x, z);
  if (y <= gy) return { y: gy, vy: 0, grounded: true };
  if (y - gy <= 0.1 && vy <= 0) return { y: gy, vy: 0, grounded: true };
  if (y - gy <= STEP_UP && vy <= 0 && y - gy < STEP_UP) {
    return { y, vy, grounded: false };
  }
  return { y, vy, grounded: false };
}

export function applyGravity(y: number, vy: number, dt: number): { y: number; vy: number } {
  const nextVy = vy - GRAVITY * dt;
  return { y: y + nextVy * dt, vy: nextVy };
}
