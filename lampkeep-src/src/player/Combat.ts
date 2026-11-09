import type { AttackState, PlayerState } from "../world/types";

export const ATTACK_WINDUP = 0.08;
export const ATTACK_ACTIVE = 0.1;
export const ATTACK_RECOVERY = 0.18;
export const ATTACK_DAMAGE = 1;
export const HITSTOP = 0.05;
export const DODGE_DURATION = 0.28;
export const DODGE_BURST = 0.18;
export const DODGE_SPEED = 9;
export const DODGE_COOLDOWN = 0.4;
export const HURT_INVULN = 0.6;
export const KNOCKBACK_SPEED = 3;
export const WALK_SPEED = 4.2;
export const GRAVITY = 20;
export const CAPSULE_RADIUS = 0.35;
export const CAPSULE_HEIGHT = 1.6;
export const STEP_UP = 0.6;
export const ATTACK_REACH = 1.2;
export const ATTACK_RADIUS = 0.45;

export function freshAttack(): AttackState {
  return { phase: "idle", t: 0, hitIds: [] };
}

export function startAttack(a: AttackState): boolean {
  if (a.phase !== "idle") return false;
  a.phase = "windup";
  a.t = 0;
  a.hitIds = [];
  return true;
}

export interface SwingHit {
  id: string;
  hit: () => void;
}

/**
 * Advance one swing. `tryHits` is consulted during the 100 ms active window.
 * Each id can take damage at most once per swing.
 * Returns true if this call connected with at least one new target.
 */
export function stepAttack(a: AttackState, dt: number, targets: SwingHit[]): boolean {
  if (a.phase === "idle" || dt <= 0) return false;
  let left = dt;
  let connected = false;
  while (left > 1e-8 && a.phase !== "idle") {
    if (a.phase === "windup") {
      const need = ATTACK_WINDUP - a.t;
      if (left + 1e-8 < need) {
        a.t += left;
        break;
      }
      left -= need;
      a.phase = "active";
      a.t = 0;
    } else if (a.phase === "active") {
      const need = ATTACK_ACTIVE - a.t;
      const slice = Math.min(left, Math.max(need, 0));
      a.t += slice;
      left -= slice;
      for (const target of targets) {
        if (a.hitIds.includes(target.id)) continue;
        a.hitIds.push(target.id);
        target.hit();
        connected = true;
      }
      if (a.t >= ATTACK_ACTIVE - 1e-8) {
        a.phase = "recovery";
        a.t = 0;
      }
    } else {
      const need = ATTACK_RECOVERY - a.t;
      if (left + 1e-8 < need) {
        a.t += left;
        break;
      }
      left -= need;
      a.phase = "idle";
      a.t = 0;
      a.hitIds = [];
    }
  }
  return connected;
}

export function startDodge(p: PlayerState, dirX: number, dirZ: number, iframeSec: number): boolean {
  if (p.dodgeCd > 0 || p.dodging || !p.alive) return false;
  const len = Math.hypot(dirX, dirZ) || 1;
  p.dodging = true;
  p.dodgeT = 0;
  p.dodgeDx = dirX / len;
  p.dodgeDz = dirZ / len;
  p.iframes = iframeSec;
  p.dodgeCd = DODGE_COOLDOWN;
  p.attack.phase = "idle";
  p.attack.t = 0;
  p.attack.hitIds = [];
  return true;
}

export function stepDodge(p: PlayerState, dt: number): void {
  if (p.iframes > 0) p.iframes = Math.max(0, p.iframes - dt);
  if (p.dodgeCd > 0) p.dodgeCd = Math.max(0, p.dodgeCd - dt);
  if (!p.dodging) return;
  p.dodgeT += dt;
  if (p.dodgeT >= DODGE_DURATION) p.dodging = false;
}

/** Returns true if the hit landed. */
export function tryHurtPlayer(
  p: PlayerState,
  amount: number,
  srcX: number,
  srcZ: number,
  damageTakenMult: number,
): boolean {
  if (p.iframes > 0 || p.hurtT > 0 || !p.alive) return false;
  p.hp = Math.max(0, p.hp - amount * damageTakenMult);
  p.hurtT = HURT_INVULN;
  const dx = p.x - srcX;
  const dz = p.z - srcZ;
  const len = Math.hypot(dx, dz) || 1;
  p.kbx = (dx / len) * KNOCKBACK_SPEED;
  p.kbz = (dz / len) * KNOCKBACK_SPEED;
  p.kbT = 0.2;
  if (p.hp <= 0) {
    p.hp = 0;
    p.alive = false;
  }
  return true;
}
