import { DEFAULT_BINDINGS, type Bindings } from "../input/bindings";
import { DEFAULT_ASSISTS, type Assists } from "../world/valley";

export const SAVE_KEY = "lampkeep.v4";
export const LEGACY_KEY = "lampkeep.v3.slice";

export interface Settings {
  assists: Assists;
  reducedMotion: boolean | null;
  textSize: 100 | 125 | 150;
  sensitivity: number;
  invertY: boolean;
  volume: number;
  bindings: Partial<Bindings>;
}

export interface SaveData {
  version: 4;
  lastBrazier: string;
  litBraziers: string[];
  foundIds: string[];
  thicketCleared: boolean;
  gatewickWoken: boolean;
  settings: Settings;
}

export interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export function defaultSettings(): Settings {
  return {
    assists: { ...DEFAULT_ASSISTS },
    reducedMotion: null,
    textSize: 100,
    sensitivity: 1,
    invertY: false,
    volume: 0.8,
    bindings: {},
  };
}

export function defaultSave(): SaveData {
  return {
    version: 4,
    lastBrazier: "BR1",
    litBraziers: [],
    foundIds: [],
    thicketCleared: false,
    gatewickWoken: false,
    settings: defaultSettings(),
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

function assistsFrom(raw: unknown, legacyMaster?: boolean): Assists {
  const base = legacyMaster === false
    ? { endlessLamp: false, stonesStay: false, autoMantle: false, gentleThicket: false, landmarkNudge: false, hintPulses: false }
    : { ...DEFAULT_ASSISTS };
  if (!raw || typeof raw !== "object") return base;
  const src = raw as Partial<Assists>;
  return {
    endlessLamp: src.endlessLamp ?? base.endlessLamp,
    stonesStay: src.stonesStay ?? base.stonesStay,
    autoMantle: src.autoMantle ?? base.autoMantle,
    gentleThicket: src.gentleThicket ?? base.gentleThicket,
    landmarkNudge: src.landmarkNudge ?? base.landmarkNudge,
    hintPulses: src.hintPulses ?? base.hintPulses,
  };
}

export function migrate(raw: unknown): SaveData | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  if (row.version === 4) {
    const settings = (row.settings ?? {}) as Partial<Settings>;
    const text = settings.textSize;
    return {
      version: 4,
      lastBrazier: typeof row.lastBrazier === "string" ? row.lastBrazier : "BR1",
      litBraziers: Array.isArray(row.litBraziers) ? row.litBraziers.map(String) : [],
      foundIds: Array.isArray(row.foundIds) ? row.foundIds.map(String) : [],
      thicketCleared: Boolean(row.thicketCleared),
      gatewickWoken: Boolean(row.gatewickWoken),
      settings: {
        ...defaultSettings(),
        ...settings,
        assists: assistsFrom(settings.assists),
        textSize: text === 125 || text === 150 ? text : 100,
        sensitivity: typeof settings.sensitivity === "number" ? settings.sensitivity : 1,
      },
    };
  }
  if (row.v === 1) {
    const old = (row.assists ?? {}) as { master?: boolean };
    const settings = defaultSettings();
    settings.assists = assistsFrom(null, old.master);
    settings.reducedMotion = typeof row.reducedMotion === "boolean" ? row.reducedMotion : null;
    settings.bindings = (row.bindings ?? {}) as Partial<Bindings>;
    return { ...defaultSave(), settings, foundIds: [] };
  }
  return null;
}

export function saveState(data: SaveData, store: KeyValueStore = browserStore()): void {
  store.setItem(SAVE_KEY, JSON.stringify(data));
}

export function loadSave(store: KeyValueStore = browserStore()): SaveData | null {
  const current = store.getItem(SAVE_KEY);
  if (current) {
    try {
      return migrate(JSON.parse(current));
    } catch {
      return null;
    }
  }
  const legacy = store.getItem(LEGACY_KEY);
  if (!legacy) return null;
  try {
    const next = migrate(JSON.parse(legacy));
    if (next) saveState(next, store);
    return next;
  } catch {
    return null;
  }
}

export function resolvedBindings(partial: Partial<Bindings>): Bindings {
  return { ...DEFAULT_BINDINGS, ...partial };
}
