import { inCircle } from "../util/hitbox";
import type { EnemyState } from "../world/types";
import { face, windSeconds } from "./EnemyBase";

export const GORSE_AGGRO = 8;
export const GORSE_SLAM_R = 1.1;
const MOVE = 2.55;
const RECOVER = 0.5;

export interface EnemyContext {
  dt: number;
  px: number;
  pz: number;
  bonusMs: number;
  hurtPlayer: (amount: number, srcX: number, srcZ: number) => void;
}

export function stepGorse(e: EnemyState, ctx: EnemyContext): void {
  if (!e.alive) return;
  e.hop += ctx.dt * 7;
  if (e.stunLeft > 0) {
    e.stunLeft -= ctx.dt;
    e.state = "stun";
    e.telegraphShape = "none";
    return;
  }
  if (e.recoverLeft > 0) {
    e.recoverLeft -= ctx.dt;
    e.state = "recover";
    e.telegraphShape = "none";
    if (e.recoverLeft > 0) return;
  }
  if (e.state === "telegraph") {
    const dx = e.markX - e.x;
    const dz = e.markZ - e.z;
    const dist = Math.hypot(dx, dz);
    if (dist > 0.15) {
      e.x += (dx / dist) * 3.4 * ctx.dt;
      e.z += (dz / dist) * 3.4 * ctx.dt;
    }
    face(e, e.markX, e.markZ);
    e.windLeft -= ctx.dt;
    if (e.windLeft <= 0) {
      if (inCircle(ctx.px, ctx.pz, e.markX, e.markZ, GORSE_SLAM_R)) {
        ctx.hurtPlayer(1, e.markX, e.markZ);
      }
      e.state = "idle";
      e.telegraphShape = "none";
      e.recoverLeft = RECOVER;
    }
    return;
  }
  const dx = ctx.px - e.x;
  const dz = ctx.pz - e.z;
  const dist = Math.hypot(dx, dz);
  if (dist < GORSE_AGGRO) {
    face(e, ctx.px, ctx.pz);
    if (dist > 1.15) {
      e.x += (dx / dist) * MOVE * ctx.dt;
      e.z += (dz / dist) * MOVE * ctx.dt;
    }
    if (e.attackCd > 0) e.attackCd -= ctx.dt;
    if (dist <= 1.85 && e.attackCd <= 0) {
      e.state = "telegraph";
      e.windTotal = windSeconds("gorse", ctx.bonusMs);
      e.windLeft = e.windTotal;
      e.telegraphShape = "circle";
      e.telegraphR = GORSE_SLAM_R;
      e.markX = ctx.px;
      e.markZ = ctx.pz;
      e.attackCd = 0.2;
    }
  } else if (e.attackCd > 0) {
    e.attackCd -= ctx.dt;
  }
}
