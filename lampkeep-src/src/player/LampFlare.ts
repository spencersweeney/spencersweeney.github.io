import { clamp } from "../util/math";
import type { EnemyKind } from "../world/types";

export const OIL_MAX = 100;
export const FLARE_COST = 25;
export const FLARE_ACTIVE = 0.2;
export const FLARE_REGEN = 5;
export const FLARE_RANGE = 4;
export const FLARE_ANGLE = 50;

export function trySpendOil(oil: number): number | null {
  if (oil + 1e-6 < FLARE_COST) return null;
  return clamp(oil - FLARE_COST, 0, OIL_MAX);
}

/** Regen is paused for the whole flare-active window. Result is clamped 0–100. */
export function regenOil(oil: number, dt: number, flaring: boolean): number {
  if (flaring || dt <= 0) return clamp(oil, 0, OIL_MAX);
  return clamp(oil + FLARE_REGEN * dt, 0, OIL_MAX);
}

export function flareEffect(
  kind: EnemyKind,
  hp: number,
): { damage: number; stun: number } | null {
  if (kind === "wisp") return { damage: 1, stun: 1.2 };
  if (kind === "gorse") return { damage: 1, stun: 0 };
  if (kind === "gatewick" && hp > 6) return { damage: 1, stun: 0 };
  return null;
}
