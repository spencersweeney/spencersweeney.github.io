export interface Rect {
  id: string;
  x0: number;
  x1: number;
  z0: number;
  z1: number;
  y: number;
  gate?: "bridge" | "sky" | "head" | "archive" | "stairs";
}

export interface Marker {
  id: string;
  x: number;
  y: number;
  z: number;
  vent?: boolean;
  terrace?: boolean;
}

export const STONES = [0, 1, 2, 3, 4, 5, 6].map((i) => ({
  i,
  x: 8,
  z: 19.2 + i * 1.85,
  y: [1.35, 1.7, 2.05, 1.75, 2.1, 1.9, 2][i] ?? 2,
}));

export interface Waypoint {
  x: number;
  z: number;
  y: number;
  kind?: "stone" | "flare" | "lamp" | "read" | "up" | "end";
  id?: string;
  gate?: Rect["gate"];
}

export const SPINE: Waypoint[] = [
  { x: 0, z: 2, y: 0 },
  { x: 0, z: 6, y: 0, kind: "flare", id: "BR1" },
  { x: 6, z: 16, y: 0 },
  ...STONES.map((s) => ({ x: s.x, z: s.z, y: s.y, kind: "stone" as const, id: `stone${s.i}` })),
  { x: 10, z: 33, y: 2 },
  { x: 24, z: 40, y: 2, kind: "flare", id: "BR2" },
  { x: 16, z: 46, y: 3.5 },
  { x: 6, z: 49, y: 5.1 },
  { x: -4, z: 51, y: 6.7 },
  { x: -14, z: 53, y: 8.4 },
  { x: -17, z: 53, y: 10, kind: "read", id: "C1" },
  { x: -22, z: 60, y: 10 },
  { x: -16, z: 66, y: 8.4 },
  { x: -8, z: 70, y: 6.4 },
  { x: -20, z: 74, y: 4.8 },
  { x: -30, z: 78, y: 4, kind: "read", id: "C3" },
  { x: -8, z: 96, y: 4 },
  { x: 18, z: 110, y: 4 },
  { x: 32, z: 118, y: 2, kind: "lamp", id: "wheel" },
  { x: 32, z: 124, y: 3.5 },
  { x: 32, z: 129, y: 5 },
  { x: 32, z: 134, y: 6, kind: "read", id: "C2", gate: "bridge" },
  { x: 18, z: 140, y: 8, gate: "bridge" },
  { x: 10, z: 142, y: 9.6 },
  { x: 4, z: 144, y: 11.2 },
  { x: 0, z: 146, y: 12.8 },
  { x: -4, z: 148, y: 14.4 },
  { x: -8, z: 149.5, y: 16 },
  { x: -8, z: 151, y: 17.6 },
  { x: -8, z: 152, y: 19.2 },
  { x: -8, z: 153, y: 20.8 },
  { x: -8, z: 154, y: 22.4 },
  { x: -8, z: 155, y: 24 },
  { x: -8, z: 156, y: 25.6 },
  { x: -8, z: 156, y: 26, kind: "flare", id: "BR5" },
  { x: -8, z: 152, y: 26, kind: "read", id: "C4" },
  { x: -8, z: 152, y: 26, kind: "up", id: "sky" },
  { x: -8, z: 152, y: 38, gate: "sky" },
  { x: -8, z: 156, y: 38, gate: "sky" },
  { x: 0, z: 170, y: 38, gate: "sky" },
  { x: 0, z: 178, y: 39.4, gate: "sky" },
  { x: 8, z: 192, y: 40, kind: "flare", id: "B2" },
  { x: 0, z: 200, y: 39.5, kind: "flare", id: "B3" },
  { x: -4, z: 196, y: 40.6 },
  { x: -8, z: 192, y: 41.6, kind: "flare", id: "B4" },
  { x: 0, z: 184, y: 40, kind: "flare", id: "B1" },
  { x: 0, z: 186, y: 40, kind: "up", id: "head" },
  { x: 0, z: 192, y: 52, kind: "read", id: "C9", gate: "head" },
  { x: 0, z: 192, y: 52, kind: "lamp", id: "wick", gate: "head" },
  { x: 0, z: 196, y: 50, gate: "stairs" },
  { x: 0, z: 200, y: 48, gate: "stairs" },
  { x: 0, z: 204, y: 46, gate: "archive" },
  { x: 0, z: 208, y: 44, kind: "read", id: "C6", gate: "archive" },
  { x: 3, z: 206, y: 44, kind: "read", id: "C8", gate: "archive" },
  { x: 0, z: 211, y: 44, kind: "end", gate: "archive" },
];

export const BRAZIERS: Marker[] = [
  { id: "BR1", x: 0, y: 0, z: 6 },
  { id: "BR2", x: 24, y: 2, z: 40 },
  { id: "BR3", x: -18, y: 10, z: 56, vent: true },
  { id: "BR4", x: 32, y: 2, z: 120 },
  { id: "BR5", x: -8, y: 26, z: 152, vent: true },
  { id: "B1", x: 0, y: 40, z: 184, terrace: true },
  { id: "B2", x: 8, y: 40, z: 192, terrace: true },
  { id: "B3", x: 0, y: 39.5, z: 200, terrace: true },
  { id: "B4", x: -8, y: 41.6, z: 192, terrace: true },
];

export const GATEWICK_ORDER = ["B2", "B3", "B4", "B1"] as const;

export const THICKET = { x0: 38, x1: 62, y0: 0, y1: 6, z0: 70, z1: 100 };
export const THICKET_ENTRANCE = { x: 36, y: 2, z: 85 };

export const SPRITE_HOMES = [
  { id: "g1", x: 48, z: 80 },
  { id: "g2", x: 54, z: 88 },
  { id: "g3", x: 50, z: 94 },
];

export const WHEEL = { x: 32, y: 2, z: 118 };
export const LIFT = { x: -4, y: 26, z: 156 };
export const HEAD = { x: 0, y: 52, z: 192 };
export const ARCHIVE = { x: 0, y: 44, z: 208 };

function box(id: string, x: number, z: number, y: number, w: number, d: number, gate?: Rect["gate"]): Rect {
  return { id, x0: x - w, x1: x + w, z0: z - d, z1: z + d, y, gate };
}

export function buildRects(): Rect[] {
  const rects: Rect[] = [];
  let run: Waypoint[] = [];
  const flush = () => {
    if (run.length === 0) return;
    rects.push(...ribbon(run));
    run = [];
  };
  SPINE.forEach((point, index) => {
    const prev = SPINE[index - 1];
    if (point.kind === "stone" || (prev && Math.abs(point.y - prev.y) > 3)) flush();
    if (point.kind !== "stone") run.push(point);
  });
  flush();
  for (const stone of STONES) rects.push(box(`stone${stone.i}`, stone.x, stone.z, stone.y, 1.05, 1.05));
  rects.push(
    { id: "trail-west", x0: -14, x1: 16, z0: -8, z1: 18, y: 0 },
    { id: "entrance", x0: 30, x1: 40, z0: 80, z1: 92, y: 2 },
    { id: "thicket", x0: 38, x1: 62, z0: 70, z1: 100, y: 2 },
    { id: "lookout", x0: -16, x1: 4, z0: 148, z1: 162, y: 26 },
    { id: "terrace", x0: -14, x1: 14, z0: 180, z1: 204, y: 40 },
    { id: "pool", x0: -6, x1: 6, z0: 196, z1: 204, y: 39.5 },
  );
  return rects;
}

function ribbon(points: Waypoint[]): Rect[] {
  const rects: Rect[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i]!;
    const b = points[i + 1]!;
    const steps = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.z - a.z) / 1.4));
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      rects.push(box(
        `path${rects.length}_${i}`,
        a.x + (b.x - a.x) * t,
        a.z + (b.z - a.z) * t,
        a.y + (b.y - a.y) * t,
        3.2,
        3.2,
        b.gate ?? a.gate,
      ));
    }
  }
  if (points.length === 1) rects.push(box("pad", points[0]!.x, points[0]!.z, points[0]!.y, 3.2, 3.2, points[0]!.gate));
  return rects;
}

export const CRITTERS = [0, 1, 2, 3, 4, 5].map((i) => ({
  id: `c${i}`,
  x: -8 + (i % 3) * 8,
  z: 74 + i * 6,
}));

export const WISPS = [
  { id: "W1", x: 0, z: 70 },
  { id: "W2", x: -30, z: 78 },
  { id: "W3", x: -8, z: 150 },
];
