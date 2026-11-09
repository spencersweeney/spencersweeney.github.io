import { DEFAULT_ASSISTS, type AssistSettings, type TelegraphStyle } from "../content/assists";
import { DEFAULT_BINDINGS, type Bindings } from "../input/bindings";
import type { CheckpointId } from "../world/types";

export const SAVE_KEY = "lampkeep.v3.slice";

export interface SaveData {
  v: 1;
  checkpointId: CheckpointId;
  assists: AssistSettings;
  bindings: Partial<Bindings>;
  fov: number;
  reducedMotion: boolean | null;
  textureWobble: boolean;
  updatedAt: string;
}

export interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const CHECKPOINTS: CheckpointId[] = ["spawn", "trail_shrine", "gate_threshold", "cleared"];
const STYLES: TelegraphStyle[] = ["amber", "high", "colorblind"];

export function defaultSave(): SaveData {
  return {
    v: 1,
    checkpointId: "spawn",
    assists: { ...DEFAULT_ASSISTS },
    bindings: {},
    fov: 60,
    reducedMotion: null,
    textureWobble: false,
    updatedAt: new Date().toISOString(),
  };
}

function memory(): KeyValueStore {
  const mem = new Map<string, string>();
  return {
    getItem: (k) => mem.get(k) ?? null,
    setItem: (k, v) => void mem.set(k, v),
    removeItem: (k) => void mem.delete(k),
  };
}

export function browserStore(): KeyValueStore {
  try {
    if (typeof localStorage === "undefined") return memory();
    const probe = "__lampkeep_probe";
    localStorage.setItem(probe, "1");
    localStorage.removeItem(probe);
    return localStorage;
  } catch {
    return memory();
  }
}

export function saveState(data: SaveData, store: KeyValueStore = browserStore()): void {
  store.setItem(SAVE_KEY, JSON.stringify(data));
}

export function loadSave(store: KeyValueStore = browserStore()): SaveData | null {
  const raw = store.getItem(SAVE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<SaveData>;
    if (parsed.v !== 1) return null;
    if (!parsed.checkpointId || !CHECKPOINTS.includes(parsed.checkpointId)) return null;
    const assists = { ...DEFAULT_ASSISTS, ...(parsed.assists ?? {}) };
    if (!STYLES.includes(assists.telegraphStyle)) assists.telegraphStyle = "amber";
    const fov = typeof parsed.fov === "number" ? Math.max(50, Math.min(75, parsed.fov)) : 60;
    return {
      v: 1,
      checkpointId: parsed.checkpointId,
      assists,
      bindings: parsed.bindings ?? {},
      fov,
      reducedMotion: typeof parsed.reducedMotion === "boolean" ? parsed.reducedMotion : null,
      textureWobble: parsed.textureWobble === true,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function hasContinue(data: SaveData | null): boolean {
  return !!data && data.checkpointId !== "spawn";
}

export function resolvedBindings(partial: Partial<Bindings> | undefined): Bindings {
  return { ...DEFAULT_BINDINGS, ...(partial ?? {}) };
}
