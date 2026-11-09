import { inCircle, inCone } from "../util/hitbox";
import type { EnemyState } from "../world/types";
import { face, gatewickPhase, windSeconds } from "./EnemyBase";
import type { EnemyContext } from "./GorseSprite";

const RECOVER = 0.8;

export function stepGatewick(e: EnemyState, ctx: EnemyContext, fight: boolean): void {
  if (!e.alive) return;
  e.hop += ctx.dt;
  face(e, ctx.px, ctx.pz);
  if (!fight) {
    e.state = "idle";
    e.telegraphShape = "none";
    return;
  }
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
    moveBoss(e, ctx);
    if (e.recoverLeft > 0) return;
  }
  if (e.state === "telegraph") {
    e.windLeft -= ctx.dt;
    if (e.windLeft <= 0) resolveBossHit(e, ctx);
    return;
  }
  moveBoss(e, ctx);
  if (e.attackCd > 0) {
    e.attackCd -= ctx.dt;
    return;
  }
  beginBossAttack(e, ctx);
}

function moveBoss(e: EnemyState, ctx: EnemyContext): void {
  const dx = ctx.px - e.x;
  const dz = ctx.pz - e.z;
  const dist = Math.hypot(dx, dz) || 1;
  let speed = 0;
  if (dist > 3.15) speed = 1.65;
  else if (dist < 2.2) speed = -1.15;
  e.x += (dx / dist) * speed * ctx.dt;
  e.z += (dz / dist) * speed * ctx.dt;
  const adx = e.x;
  const adz = e.z - 56;
  const ad = Math.hypot(adx, adz);
  if (ad > 6.4) {
    e.x = (adx / ad) * 6.4;
    e.z = 56 + (adz / ad) * 6.4;
  }
}

function beginBossAttack(e: EnemyState, ctx: EnemyContext): void {
  e.state = "telegraph";
  e.pendingSummon = false;
  if (gatewickPhase(e.hp) === 1) {
    e.ring = 0;
    e.windTotal = windSeconds("gatewickSweep", ctx.bonusMs);
    e.windLeft = e.windTotal;
    e.telegraphShape = "cone";
    e.telegraphCone = 90;
    e.telegraphLen = 3.5;
    e.markX = e.x;
    e.markZ = e.z;
    face(e, ctx.px, ctx.pz);
    e.sweeps += 1;
    if (e.sweeps % 2 === 0) e.pendingSummon = true;
  } else {
    e.ring = 1;
    e.windTotal = windSeconds("gatewickSlam", ctx.bonusMs);
    e.windLeft = e.windTotal;
    e.telegraphShape = "circle";
    e.telegraphR = 2;
    e.markX = e.x;
    e.markZ = e.z;
  }
}

function resolveBossHit(e: EnemyState, ctx: EnemyContext): void {
  if (e.telegraphShape === "cone") {
    if (inCone(e.x, e.z, e.aimX, e.aimZ, ctx.px, ctx.pz, e.telegraphLen, e.telegraphCone)) {
      ctx.hurtPlayer(1, e.x, e.z);
    }
    e.state = "idle";
    e.telegraphShape = "none";
    e.recoverLeft = RECOVER;
    return;
  }
  if (e.ring === 1) {
    if (inCircle(ctx.px, ctx.pz, e.x, e.z, 2)) ctx.hurtPlayer(1, e.x, e.z);
    e.ring = 2;
    e.windTotal = windSeconds("gatewickSlam", ctx.bonusMs);
    e.windLeft = e.windTotal;
    e.telegraphShape = "circle";
    e.telegraphR = 3.2;
    e.markX = e.x;
    e.markZ = e.z;
    e.state = "telegraph";
    return;
  }
  if (inCircle(ctx.px, ctx.pz, e.x, e.z, e.telegraphR)) ctx.hurtPlayer(1, e.x, e.z);
  e.ring = 0;
  e.state = "idle";
  e.telegraphShape = "none";
  e.recoverLeft = RECOVER;
}
