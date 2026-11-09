export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Wrap radians into [-PI, PI]. */
export function wrapAngle(a: number): number {
  const tau = Math.PI * 2;
  let x = (a + Math.PI) % tau;
  if (x < 0) x += tau;
  return x - Math.PI;
}

export function damp(current: number, target: number, lambda: number, dt: number): number {
  return lerp(current, target, 1 - Math.exp(-lambda * dt));
}

export function dampAngle(current: number, target: number, lambda: number, dt: number): number {
  return current + wrapAngle(target - current) * (1 - Math.exp(-lambda * dt));
}

export function hypot2(x: number, z: number): number {
  return Math.hypot(x, z);
}
