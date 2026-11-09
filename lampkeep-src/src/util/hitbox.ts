import { clamp } from "./math";

export function pointSegmentDistance(
  px: number,
  py: number,
  pz: number,
  ax: number,
  ay: number,
  az: number,
  bx: number,
  by: number,
  bz: number,
): number {
  const abx = bx - ax;
  const aby = by - ay;
  const abz = bz - az;
  const apx = px - ax;
  const apy = py - ay;
  const apz = pz - az;
  const ab2 = abx * abx + aby * aby + abz * abz;
  const t = ab2 > 1e-8 ? clamp((apx * abx + apy * aby + apz * abz) / ab2, 0, 1) : 0;
  const dx = ax + abx * t - px;
  const dy = ay + aby * t - py;
  const dz = az + abz * t - pz;
  return Math.hypot(dx, dy, dz);
}

/** Capsule (segment a→b, radius capR) against a sphere. */
export function capsuleHitsSphere(
  ax: number,
  ay: number,
  az: number,
  bx: number,
  by: number,
  bz: number,
  capR: number,
  cx: number,
  cy: number,
  cz: number,
  sphR: number,
): boolean {
  return pointSegmentDistance(cx, cy, cz, ax, ay, az, bx, by, bz) <= capR + sphR;
}

export function inCircle(
  x: number,
  z: number,
  cx: number,
  cz: number,
  r: number,
): boolean {
  const dx = x - cx;
  const dz = z - cz;
  return dx * dx + dz * dz <= r * r + 1e-6;
}

/**
 * XZ cone. `fullAngleDeg` is the full aperture (50 means ±25°).
 * `fx, fz` is the forward direction (does not need to be unit length).
 */
export function inCone(
  ox: number,
  oz: number,
  fx: number,
  fz: number,
  px: number,
  pz: number,
  range: number,
  fullAngleDeg: number,
): boolean {
  const dx = px - ox;
  const dz = pz - oz;
  const dist = Math.hypot(dx, dz);
  if (dist > range) return false;
  if (dist < 1e-4) return true;
  const fl = Math.hypot(fx, fz) || 1;
  const dot = (dx / dist) * (fx / fl) + (dz / dist) * (fz / fl);
  const half = ((fullAngleDeg * Math.PI) / 180) * 0.5;
  return Math.acos(clamp(dot, -1, 1)) <= half + 1e-4;
}
