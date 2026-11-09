import type { NightState } from "./types";

export const UNDO_CAP = 30;

export function snapshotForUndo(state: NightState): NightState {
  const snap = structuredClone(state);
  snap.notices = [];
  return snap;
}

export function pushSnapshot(stack: NightState[], state: NightState): NightState[] {
  const next = [...stack, snapshotForUndo(state)];
  if (next.length > UNDO_CAP) next.splice(0, next.length - UNDO_CAP);
  return next;
}

export function popSnapshot(
  stack: NightState[],
): { stack: NightState[]; state: NightState } | null {
  if (stack.length === 0) return null;
  const state = structuredClone(stack[stack.length - 1]!);
  state.notices = [];
  return { stack: stack.slice(0, -1), state };
}
