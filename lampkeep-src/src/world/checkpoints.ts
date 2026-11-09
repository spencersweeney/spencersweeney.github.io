import type { CheckpointId, EnemyKind } from "./types";

export interface Spawn {
  id: string;
  kind: EnemyKind;
  x: number;
  z: number;
}

export const SPAWN = { x: 0, y: 0, z: 0 };
export const TRAIL_SHRINE = { x: 0, y: 0, z: 22 };
export const GATE_SHRINE = { x: 0, y: 0, z: 48 };
export const ARENA = { x: 0, y: 0, z: 56, r: 8 };

/** Gentle S so the listed shrines sit on the centerline and |x| stays under 3. */
export function pathCenterX(z: number): number {
  if (z < 22) return 2 * Math.sin((Math.PI * z) / 22);
  if (z < 48) return 2.2 * Math.sin((Math.PI * (z - 22)) / 26);
  return 0;
}

function onPath(z: number, side: number): { x: number; z: number } {
  return { x: pathCenterX(z) + side, z };
}

const g1 = onPath(9.4, 0.85);
const g2 = onPath(12.7, -0.9);
const g3 = onPath(17.3, 0.7);
const g4 = onPath(25.2, -0.85);
const g5 = onPath(27.8, 0.75);
const w1 = onPath(33.2, -1.05);
const w2 = onPath(38.4, 1.0);

export const ENEMY_SPAWNS: Spawn[] = [
  { id: "gorse1", kind: "gorse", x: g1.x, z: g1.z },
  { id: "gorse2", kind: "gorse", x: g2.x, z: g2.z },
  { id: "gorse3", kind: "gorse", x: g3.x, z: g3.z },
  { id: "gorse4", kind: "gorse", x: g4.x, z: g4.z },
  { id: "gorse5", kind: "gorse", x: g5.x, z: g5.z },
  { id: "wisp1", kind: "wisp", x: w1.x, z: w1.z },
  { id: "wisp2", kind: "wisp", x: w2.x, z: w2.z },
  { id: "gatewick", kind: "gatewick", x: 0, z: 56 },
];

export const PILLARS: { x: number; z: number; r: number }[] = [
  { x: 5.4, z: 58.2, r: 0.55 },
  { x: -5.4, z: 58.2, r: 0.55 },
  { x: 4.6, z: 61.4, r: 0.5 },
  { x: -4.6, z: 61.4, r: 0.5 },
  { x: 3.6, z: 53.6, r: 0.48 },
  { x: -3.6, z: 53.6, r: 0.48 },
];

const RANK: Record<CheckpointId, number> = {
  spawn: 0,
  trail_shrine: 1,
  gate_threshold: 2,
  cleared: 3,
};

export function checkpointRank(id: CheckpointId): number {
  return RANK[id];
}

export function checkpointPose(id: CheckpointId): { x: number; y: number; z: number } {
  if (id === "trail_shrine") return { ...TRAIL_SHRINE };
  if (id === "gate_threshold" || id === "cleared") return { ...GATE_SHRINE };
  return { ...SPAWN };
}
