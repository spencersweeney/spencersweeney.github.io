import type { MistRoad } from "../world/MistRoadLevel";
import { pathCenterX } from "../world/checkpoints";
import { IDLE_INPUT, type FrameInput } from "../world/types";

function go(yaw: number, extra: Partial<FrameInput> = {}): FrameInput {
  return {
    ...IDLE_INPUT,
    moveX: 0,
    moveY: 1,
    moveYaw: yaw,
    ...extra,
  };
}

/** Scripted driver used by the headless playthrough and the in-browser demo. */
export function demoPolicy(w: MistRoad): FrameInput {
  const p = w.player;
  if (!p.alive || w.outcome !== "play") return { ...IDLE_INPUT };

  const soon = w.enemies.filter(
    (e) => e.alive && e.windLeft > 0 && e.windLeft < 0.22 && w.shapeThreatens(e, p.x, p.z),
  );
  if (soon.length && p.iframes <= 0 && !p.dodging) {
    const e = soon[0];
    const dx = p.x - e.markX;
    const dz = p.z - e.markZ;
    const away = Math.hypot(dx, dz) > 0.2 ? Math.atan2(dx, dz) : e.yaw + Math.PI / 2;
    const side = e.telegraphShape === "cone" ? Math.atan2(e.aimX, e.aimZ) + Math.PI / 2 : away;
    if (p.dodgeCd <= 0) return go(side, { dodge: true });
    return go(side);
  }

  const shrine = w.nextShrine();
  const target = w.nearestThreat(8.5);
  if (shrine && (!target || shrine.z < target.homeZ - 1.2)) {
    const dx = shrine.x - p.x;
    const dz = shrine.z - p.z;
    const d = Math.hypot(dx, dz);
    const yaw = Math.atan2(dx, dz);
    if (d < 1.35) return { ...IDLE_INPUT, moveYaw: yaw, interact: true };
    if (shrine.z >= p.z - 2.5) return go(yaw);
  }

  if (!target) {
    const z = Math.min(54, p.z + 5);
    const x = pathCenterX(Math.max(0, Math.min(48, z)));
    return go(Math.atan2(x - p.x, z - p.z));
  }

  const dx = target.x - p.x;
  const dz = target.z - p.z;
  const dist = Math.hypot(dx, dz) || 0.0001;
  const yaw = Math.atan2(dx, dz);
  const desired = target.kind === "gatewick" ? 2.35 : target.kind === "wisp" ? 1.35 : 1.3;
  const flare =
    target.kind === "wisp" &&
    target.stunLeft <= 0 &&
    !p.flaring &&
    p.oil >= 25 &&
    dist < 4.15 &&
    dist > 0.7;

  if (dist > desired + 0.18) return go(yaw, { flare });
  if (target.kind === "gatewick" && dist < desired - 0.4) return go(yaw + Math.PI);
  const attack = p.attack.phase === "idle" && !p.dodging;
  return { ...IDLE_INPUT, moveYaw: yaw, attack, flare };
}
