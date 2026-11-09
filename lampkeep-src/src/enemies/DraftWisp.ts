import { inCone } from "../util/hitbox";
import type { EnemyState } from "../world/types";
import { face, windSeconds } from "./EnemyBase";
import type { EnemyContext } from "./GorseSprite";

const SPEED = 2.65;
const RECOVER = 0.55;

export function stepWisp(e: EnemyState, ctx: EnemyContext): void {
  if (!e.alive) return;
  e.hop += ctx.dt * 3;
  if (e.stunLeft > 0) {
    e.stunLeft -= ctx.dt;
    e.state = "stun";
    e.telegraphShape = "none";
    e.y = 1.15 + Math.sin(e.hop) * 0.08;
    return;
  }
  if (e.recoverLeft > 0) {
    e.recoverLeft -= ctx.dt;
    e.state = "recover";
    e.telegraphShape = "none";
    e.y = 1.15 + Math.sin(e.hop) * 0.12;
    if (e.recoverLeft > 0) return;
  }
  const dx = ctx.px - e.x;
  const dz = ctx.pz - e.z;
  const dist = Math.hypot(dx, dz) || 1;
  if (e.state === "telegraph") {
    e.windLeft -= ctx.dt;
    if (e.windLeft <= 0) {
      if (inCone(e.x, e.z, e.aimX, e.aimZ, ctx.px, ctx.pz, e.telegraphLen, e.telegraphCone)) {
        ctx.hurtPlayer(1, e.x, e.z);
      }
      e.state = "idle";
      e.telegraphShape = "none";
      e.recoverLeft = RECOVER;
    }
    e.y = 1.15 + Math.sin(e.hop) * 0.12;
    return;
  }
  if (dist < 12) {
    face(e, ctx.px, ctx.pz);
    let mx = 0;
    let mz = 0;
    if (dist < 5) {
      mx = -dx / dist;
      mz = -dz / dist;
    } else if (dist > 7) {
      mx = dx / dist;
      mz = dz / dist;
    } else {
      e.strafeT += ctx.dt;
      if (e.strafeT > 1.6) {
        e.strafe = -e.strafe;
        e.strafeT = 0;
      }
      mx = (-dz / dist) * e.strafe;
      mz = (dx / dist) * e.strafe;
    }
    e.x += mx * SPEED * ctx.dt;
    e.z += mz * SPEED * ctx.dt;
    if (e.attackCd > 0) e.attackCd -= ctx.dt;
    if (dist < 8.5 && dist > 2.2 && e.attackCd <= 0) {
      e.state = "telegraph";
      e.windTotal = windSeconds("wisp", ctx.bonusMs);
      e.windLeft = e.windTotal;
      e.telegraphShape = "cone";
      e.telegraphCone = 60;
      e.telegraphLen = 5;
      e.attackCd = 0.15;
      face(e, ctx.px, ctx.pz);
    }
  }
  e.y = 1.15 + Math.sin(e.hop) * 0.18;
}
