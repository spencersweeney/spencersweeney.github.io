import { SPINE, type Waypoint } from "../world/level";
import { IDLE, type PlayInput, type Valley } from "../world/valley";

const progress = new WeakMap<Valley, number>();

export function demoInput(v: Valley): PlayInput {
  if (v.card || v.endCard || (v.sequence > 0 && v.sequence < 11.5)) return { ...IDLE, dismiss: true };
  let index = progress.get(v) ?? 0;
  while (index < SPINE.length && done(v, SPINE[index]!)) index += 1;
  progress.set(v, index);
  const goal = SPINE[Math.min(index, SPINE.length - 1)]!;
  const prev = SPINE[Math.max(0, index - 1)]!;
  if (index > 0 && distToSegment(v.player.x, v.player.z, prev, goal) > 5) {
    let nearest = 0;
    let best = 1e9;
    for (let i = 0; i <= Math.min(index, SPINE.length - 1); i++) {
      const point = SPINE[i]!;
      if (point.gate && !gateOpen(v, point.gate)) continue;
      const d = Math.hypot(point.x - v.player.x, point.z - v.player.z) + Math.abs(point.y - v.player.y) * 2;
      if (d < best) {
        best = d;
        nearest = i;
      }
    }
    return steer(v, SPINE[Math.min(nearest + 1, index)]!);
  }
  return steer(v, goal);
}

function distToSegment(px: number, pz: number, a: Waypoint, b: Waypoint): number {
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const len2 = dx * dx + dz * dz || 1;
  const t = Math.min(1, Math.max(0, ((px - a.x) * dx + (pz - a.z) * dz) / len2));
  return Math.hypot(px - (a.x + dx * t), pz - (a.z + dz * t));
}

function gateOpen(v: Valley, gate: Waypoint["gate"]): boolean {
  if (gate === "bridge") return v.bridge;
  if (gate === "head") return v.updrafts;
  if (gate === "stairs" || gate === "archive") return v.archiveOpen;
  return true;
}

function done(v: Valley, point: Waypoint): boolean {
  const dist = Math.hypot(point.x - v.player.x, point.z - v.player.z);
  const here = dist < 2.2 && v.player.y >= point.y - 0.8;
  if (point.kind === "flare") return Boolean(point.id && v.lit.has(point.id));
  if (point.kind === "lamp" && point.id === "wheel") return v.bridge;
  if (point.kind === "lamp" && point.id === "wick") return v.woken;
  if (point.kind === "read") return Boolean(point.id && v.found.has(point.id));
  if (point.kind === "up" && point.id === "sky") return v.player.y >= 37;
  if (point.kind === "up" && point.id === "head") return v.player.y >= 50;
  if (point.kind === "end") return v.endCard;
  return here;
}

function steer(v: Valley, goal: Waypoint): PlayInput {
  const dx = goal.x - v.player.x;
  const dz = goal.z - v.player.z;
  const dist = Math.hypot(dx, dz);
  const here = dist < 1.35;
  const yaw = Math.atan2(dx, dz);
  const rising = goal.kind === "up";
  return {
    ...IDLE,
    moveY: here ? 0 : 1,
    moveYaw: yaw,
    run: !rising,
    lamp: goal.kind === "stone" || goal.kind === "lamp" || (rising && v.player.y > 28),
    flare: goal.kind === "flare" && here,
    interact: (goal.kind === "read" || goal.kind === "end") && here,
    jump: rising ? (v.player.grounded ? Math.floor(v.time * 3) % 2 === 0 : true) : false,
  };
}
