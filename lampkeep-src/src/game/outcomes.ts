import { NON_HOLLOW, type GuestStatus, type NightState, type OutcomeId } from "./types";

export function isCompleteStatus(status: GuestStatus): boolean {
  return status === "leave_ready" || status === "departed_complete";
}

export function allNonHollowComplete(state: NightState): boolean {
  return NON_HOLLOW.every((id) => isCompleteStatus(state.guests[id].status));
}

/** Priority: failed > strained > perfect > warm. See slice spec §2.5. */
export function evaluateOutcome(state: NightState): OutcomeId {
  const stuck = NON_HOLLOW.some((id) => {
    const status = state.guests[id].status;
    return status === "waiting" || status === "resting";
  });
  const failed = state.strain >= 5 || (state.bell === 6 && stuck);
  if (failed) return "failed";

  const complete = allNonHollowComplete(state);
  if (state.strain >= 3 || !complete) return "strained";

  const hollowDone = state.guests.hollow.status === "departed_unfinished";
  const perfect =
    hollowDone && state.oil >= 1 && state.harshSeals === 0 && state.strain <= 1;
  if (perfect) return "perfect";
  return "warm";
}

export function canRingDawn(state: NightState): boolean {
  if (state.phase !== "play" || state.dawnLocked || state.pendingEventId) return false;
  if (state.bell === 6) return true;
  return state.bell >= 5 && allNonHollowComplete(state);
}
