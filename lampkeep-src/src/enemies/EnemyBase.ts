import { telegraphDurationMs, type TelegraphKind } from "../content/assists";
import type { EnemyKind, EnemyState } from "../world/types";

export function maxHpFor(kind: EnemyKind): number {
  if (kind === "gorse") return 2;
  if (kind === "wisp") return 3;
  return 12;
}

export function hurtRadius(kind: EnemyKind): number {
  if (kind === "gorse") return 0.55;
  if (kind === "wisp") return 0.5;
  return 1.25;
}

export function hurtCenterY(kind: EnemyKind): number {
  if (kind === "wisp") return 1.25;
  if (kind === "gatewick") return 1.35;
  return 0.6;
}

export function makeEnemy(
  id: string,
  kind: EnemyKind,
  x: number,
  z: number,
  summon = false,
): EnemyState {
  const side = id.charCodeAt(id.length - 1) % 2 === 0 ? 1 : -1;
  return {
    id,
    kind,
    x,
    y: kind === "wisp" ? 1.15 : 0,
    z,
    yaw: Math.PI,
    hp: maxHpFor(kind),
    maxHp: maxHpFor(kind),
    alive: true,
    homeX: x,
    homeZ: z,
    summon,
    state: "idle",
    windTotal: 0,
    windLeft: 0,
    recoverLeft: 0,
    stunLeft: 0,
    attackCd: 0.35,
    ring: 0,
    sweeps: 0,
    telegraphShape: "none",
    telegraphR: 0,
    telegraphCone: 0,
    telegraphLen: 0,
    aimX: 0,
    aimZ: 1,
    markX: x,
    markZ: z,
    hop: 0,
    strafe: side,
    strafeT: 0,
    pendingSummon: false,
  };
}

export function windSeconds(kind: TelegraphKind, bonusMs: number): number {
  return telegraphDurationMs(kind, bonusMs > 0) / 1000;
}

export function face(e: EnemyState, x: number, z: number): void {
  const dx = x - e.x;
  const dz = z - e.z;
  const len = Math.hypot(dx, dz) || 1;
  e.aimX = dx / len;
  e.aimZ = dz / len;
  e.yaw = Math.atan2(dx, dz);
}

export function damageEnemy(e: EnemyState, amount: number): void {
  if (!e.alive || amount <= 0) return;
  e.hp = Math.max(0, e.hp - amount);
  if (e.hp <= 0) {
    e.alive = false;
    e.telegraphShape = "none";
    e.state = "idle";
    e.windLeft = 0;
  }
}

export function stunEnemy(e: EnemyState, seconds: number): void {
  if (!e.alive || seconds <= 0) return;
  e.stunLeft = Math.max(e.stunLeft, seconds);
  e.state = "stun";
  e.telegraphShape = "none";
  e.windLeft = 0;
  e.ring = 0;
}

export function gatewickPhase(hp: number): 1 | 2 {
  return hp <= 6 ? 2 : 1;
}
