import { NIGHT } from "./content";
import type { NightState } from "./types";

export const SAVE_KEY = "lampkeep.v1.slice";

export interface Assists {
  relaxedOil: boolean;
  showCosts: boolean;
  highlightLegal: boolean;
  hostHints: boolean;
  propRefresh: boolean;
  reducedMotion: boolean | null;
}

export interface Meta {
  introSeen: boolean;
  nightsFinished: number;
  lastOutcome: string | null;
  dismissedTipId: string | null;
}

export type ScreenId = "title" | "intro" | "play" | "epilogue";

export interface SaveData {
  v: 1;
  updatedAt: string;
  seed: string;
  assists: Assists;
  night: NightState | null;
  undoStack: NightState[];
  meta: Meta;
  screen: ScreenId;
}

export function defaultAssists(): Assists {
  return {
    relaxedOil: false,
    showCosts: true,
    highlightLegal: true,
    hostHints: false,
    propRefresh: false,
    reducedMotion: null,
  };
}

export function defaultMeta(): Meta {
  return {
    introSeen: false,
    nightsFinished: 0,
    lastOutcome: null,
    dismissedTipId: null,
  };
}

function sanitizeAssists(value: unknown): Assists {
  const base = defaultAssists();
  if (!value || typeof value !== "object") return base;
  const o = value as Partial<Assists>;
  return {
    relaxedOil: Boolean(o.relaxedOil),
    showCosts: o.showCosts === undefined ? true : Boolean(o.showCosts),
    highlightLegal: o.highlightLegal === undefined ? true : Boolean(o.highlightLegal),
    hostHints: Boolean(o.hostHints),
    propRefresh: Boolean(o.propRefresh),
    reducedMotion:
      o.reducedMotion === true ? true : o.reducedMotion === false ? false : null,
  };
}

function sanitizeMeta(value: unknown): Meta {
  const base = defaultMeta();
  if (!value || typeof value !== "object") return base;
  const o = value as Partial<Meta>;
  return {
    introSeen: Boolean(o.introSeen),
    nightsFinished: typeof o.nightsFinished === "number" ? o.nightsFinished : 0,
    lastOutcome: typeof o.lastOutcome === "string" ? o.lastOutcome : null,
    dismissedTipId: typeof o.dismissedTipId === "string" ? o.dismissedTipId : null,
  };
}

function isNight(value: unknown): value is NightState {
  if (!value || typeof value !== "object") return false;
  const n = value as NightState;
  return typeof n.bell === "number" && !!n.rooms && !!n.guests && !!n.props;
}

export function migrate(raw: unknown): SaveData | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const assists = sanitizeAssists(o.assists);
  const meta = sanitizeMeta(o.meta);
  if (o.v !== 1) {
    return {
      v: 1,
      updatedAt: new Date().toISOString(),
      seed: NIGHT.seed,
      assists,
      night: null,
      undoStack: [],
      meta,
      screen: "title",
    };
  }
  const night = isNight(o.night) ? o.night : null;
  const undoStack = Array.isArray(o.undoStack)
    ? (o.undoStack as NightState[]).filter(isNight).slice(-30)
    : [];
  const screen: ScreenId =
    o.screen === "play" || o.screen === "intro" || o.screen === "epilogue" || o.screen === "title"
      ? o.screen
      : "title";
  return {
    v: 1,
    updatedAt: typeof o.updatedAt === "string" ? o.updatedAt : new Date().toISOString(),
    seed: typeof o.seed === "string" ? o.seed : NIGHT.seed,
    assists,
    night,
    undoStack,
    meta,
    screen: night ? screen : "title",
  };
}

export function nightInProgress(save: SaveData | null): boolean {
  if (!save?.night) return false;
  return save.night.phase === "play" && !save.night.dawnLocked;
}

export function loadSave(): SaveData | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return migrate(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function writeSave(save: SaveData): void {
  if (typeof localStorage === "undefined") return;
  const copy = { ...save, updatedAt: new Date().toISOString() };
  localStorage.setItem(SAVE_KEY, JSON.stringify(copy));
}

export function clearNight(save: SaveData): SaveData {
  return {
    ...save,
    night: null,
    undoStack: [],
    screen: "title",
    updatedAt: new Date().toISOString(),
  };
}
