export type TelegraphStyle = "amber" | "high" | "colorblind";

export interface AssistSettings {
  master: boolean;
  damageAssist: boolean;
  extraIframes: boolean;
  softLock: boolean;
  cameraRecenter: boolean;
  showPrompts: boolean;
  slowCombat: boolean;
  telegraphStyle: TelegraphStyle;
}

export interface EffectiveAssists {
  damageTakenMult: number;
  dodgeIframesMs: number;
  telegraphBonusMs: number;
  softLock: boolean;
  cameraRecenter: boolean;
  showPrompts: boolean;
  slowCombat: boolean;
  telegraphStyle: TelegraphStyle;
}

export const DEFAULT_ASSISTS: AssistSettings = {
  master: true,
  damageAssist: true,
  extraIframes: true,
  softLock: true,
  cameraRecenter: true,
  showPrompts: true,
  slowCombat: false,
  telegraphStyle: "amber",
};

export function effectiveAssists(s: AssistSettings): EffectiveAssists {
  const on = s.master;
  return {
    damageTakenMult: on && s.damageAssist ? 0.5 : 1,
    dodgeIframesMs: on && s.extraIframes ? 300 : 220,
    telegraphBonusMs: on ? 150 : 0,
    softLock: on && s.softLock,
    cameraRecenter: on && s.cameraRecenter,
    showPrompts: on && s.showPrompts,
    slowCombat: on && s.slowCombat,
    telegraphStyle: s.telegraphStyle,
  };
}

export const TELEGRAPH_BASE_MS = {
  gorse: 400,
  wisp: 450,
  gatewickSweep: 500,
  gatewickSlam: 550,
} as const;

export type TelegraphKind = keyof typeof TELEGRAPH_BASE_MS;

/** Resolved wind-up. Assist on adds 150 ms. Always at least 350 ms (500 when assists are on). */
export function telegraphDurationMs(kind: TelegraphKind, assistsOn: boolean): number {
  const bonus = assistsOn ? 150 : 0;
  const min = assistsOn ? 500 : 350;
  return Math.max(TELEGRAPH_BASE_MS[kind] + bonus, min);
}
