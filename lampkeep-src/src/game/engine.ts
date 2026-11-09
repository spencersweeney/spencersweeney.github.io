import { EVENTS, GUESTS, NIGHT, PROP_TAG, PROPS, ROOMS } from "./content";
import { evaluateOutcome, canRingDawn } from "./outcomes";
import { shuffle } from "./rng";
import {
  GUEST_ORDER,
  NON_HOLLOW,
  ROOM_ORDER,
  type Action,
  type CreateOptions,
  type ErrorCode,
  type EventId,
  type GuestId,
  type GuestState,
  type NightState,
  type PropId,
  type Result,
  type RoomId,
  type RoomState,
} from "./types";

function blankGuest(): GuestState {
  return {
    status: "absent",
    room: null,
    arrivedBell: null,
    bellsWaited: 0,
    waitPenaltyApplied: false,
    restProgress: 0,
  };
}

function fail(state: NightState, error: ErrorCode): Result {
  return { ok: false, error, state };
}

function ok(state: NightState): Result {
  return { ok: true, state };
}

export function occupants(state: NightState, room: RoomId): GuestId[] {
  return GUEST_ORDER.filter((id) => {
    const guest = state.guests[id];
    return (
      guest.room === room &&
      (guest.status === "resting" || guest.status === "leave_ready")
    );
  });
}

export function roomHasTag(state: NightState, room: RoomId, tag: string): boolean {
  return state.rooms[room].props.some((prop) => PROP_TAG[prop] === tag);
}

/** Prop + room match required before a guest can be invited or tick Rest. */
export function setupOk(state: NightState, guest: GuestId, room: RoomId): boolean {
  const def = GUESTS[guest];
  if (!def.canRest) return false;
  if (!def.accepted.includes(room)) return false;
  if (guest === "bram") {
    if (room === "quiet_cell") return roomHasTag(state, room, "cloak");
    if (room === "hearth_hall") return true;
    return false;
  }
  return def.propTags.some((tag) => roomHasTag(state, room, tag));
}

export function lightCost(state: NightState): number {
  return state.steadyWick ? 1 : 2;
}

function syncRoom(state: NightState, roomId: RoomId): void {
  const room = state.rooms[roomId];
  if (roomId === "foyer") {
    room.lamp = "lit";
    return;
  }
  const present = occupants(state, roomId);
  const resting = present.some((id) => state.guests[id].status === "resting");
  const ready = present.some((id) => state.guests[id].status === "leave_ready");
  if (resting) room.lamp = "occupied";
  else if (ready) room.lamp = "leave_ready";
  else if (room.props.length > 0 && room.lamp !== "unlit") room.lamp = "staged";
  else if (room.lamp !== "unlit") room.lamp = "lit";
}

function syncAll(state: NightState): void {
  for (const id of ROOM_ORDER) syncRoom(state, id);
}

function progressKey(state: NightState): string {
  return GUEST_ORDER.map((id) => `${id}:${state.guests[id].status}:${state.guests[id].room ?? ""}`).join("|");
}

function arrive(state: NightState, guest: GuestId, bell: number): void {
  const g = state.guests[guest];
  if (g.status !== "absent") return;
  if (guest === "hollow" && state.hollowResolved) return;
  g.status = "waiting";
  g.arrivedBell = bell;
  g.room = null;
  state.notices.push({ kind: "arrival", guest });
}

export function contentionOpen(state: NightState): boolean {
  if (state.hearthAward === "shared") return false;
  const cadence = state.guests.cadence;
  const bram = state.guests.bram;
  const cadenceIn =
    cadence.status === "waiting" ||
    (cadence.status === "resting" && cadence.room === "hearth_hall");
  const bramIn =
    bram.status === "waiting" || (bram.status === "resting" && bram.room === "hearth_hall");
  if (!cadenceIn || !bramIn) return false;
  if (state.hearthAward === "cadence" && bram.room !== "hearth_hall") return false;
  if (state.hearthAward === "bram" && cadence.room !== "hearth_hall") return false;
  return cadence.status === "waiting" || bram.status === "waiting";
}

function blocked(state: NightState): ErrorCode | null {
  if (state.dawnLocked || state.phase !== "play") return "dawn_locked";
  if (state.pendingEventId) return "event_pending";
  if (state.awaitingDawnConfirm) return "illegal";
  return null;
}

function roomIsLitLike(room: RoomState): boolean {
  return room.lamp === "lit" || room.lamp === "staged" || room.lamp === "occupied" || room.lamp === "leave_ready";
}

export function canInvite(
  state: NightState,
  guest: GuestId,
  room: RoomId,
  ignoreActions = false,
): boolean {
  if (guest === "hollow") return false;
  const g = state.guests[guest];
  if (g.status !== "waiting") return false;
  if (!GUESTS[guest].accepted.includes(room)) return false;
  if (room === "foyer" || state.rooms[room].seal) return false;
  if (!roomIsLitLike(state.rooms[room])) return false;
  if (!setupOk(state, guest, room)) return false;
  const others = occupants(state, room);
  if (others.length > 0) {
    const shared = room === "hearth_hall" && state.hearthAward === "shared";
    if (!shared) return false;
  }
  if (room === "hearth_hall" && state.hearthAward === "cadence" && guest === "bram") return false;
  if (room === "hearth_hall" && state.hearthAward === "bram" && guest === "cadence") return false;
  if (state.pendingEventId || state.phase !== "play" || state.awaitingDawnConfirm) return false;
  const free = state.freeInviteRoom === room;
  if (!ignoreActions && state.actionsLeft <= 0 && !free) return false;
  return true;
}

export function canLight(state: NightState, room: RoomId): boolean {
  if (blocked(state)) return false;
  if (room === "foyer") return false;
  if (state.rooms[room].seal) return false;
  if (state.rooms[room].lamp !== "unlit") return false;
  if (state.actionsLeft <= 0) return false;
  return state.oil >= lightCost(state);
}

export function canStage(state: NightState, room: RoomId): boolean {
  if (blocked(state)) return false;
  if (room === "foyer") return false;
  const lamp = state.rooms[room].lamp;
  if (lamp !== "lit" && lamp !== "staged") return false;
  if (state.actionsLeft <= 0) return false;
  return PROPS.some((p) => state.props[p.id].location === "tray");
}

export function canMediate(state: NightState): boolean {
  if (blocked(state)) return false;
  if (state.actionsLeft <= 0) return false;
  return contentionOpen(state);
}

export function canClose(state: NightState): boolean {
  if (blocked(state)) return false;
  if (state.actionsLeft <= 0) return false;
  return state.rooms.cellar.seal === null;
}

export function canRefuse(state: NightState): boolean {
  if (blocked(state)) return false;
  if (state.actionsLeft <= 0) return false;
  return state.guests.hollow.status === "waiting";
}

function seat(state: NightState, guest: GuestId, room: RoomId, how: "invite" | "share" | "alternate"): void {
  const g = state.guests[guest];
  if (g.status === "departed_complete" || g.status === "departed_unfinished" || g.status === "leave_ready") {
    return;
  }
  if (g.status !== "resting") g.restProgress = 0;
  g.status = "resting";
  g.room = room;
  state.notices.push({ kind: "seat", guest, how });
}

function evictIf(state: NightState, guest: GuestId, room: RoomId): void {
  const g = state.guests[guest];
  if (g.room === room && (g.status === "resting" || g.status === "leave_ready")) {
    g.status = "waiting";
    g.room = null;
    g.restProgress = 0;
  }
}

function markHollowDeparted(state: NightState): void {
  const hollow = state.guests.hollow;
  if (
    hollow.status === "absent" ||
    hollow.status === "waiting" ||
    hollow.status === "resting" ||
    hollow.status === "leave_ready"
  ) {
    hollow.status = "departed_unfinished";
    hollow.room = null;
  }
  state.hollowResolved = true;
}

function applyRestAndStrain(state: NightState): void {
  for (const id of NON_HOLLOW) {
    const guest = state.guests[id];
    if (guest.status === "resting" && guest.room && setupOk(state, id, guest.room)) {
      guest.restProgress += 1;
      if (guest.restProgress >= GUESTS[id].restBells) {
        guest.status = "leave_ready";
        state.notices.push({ kind: "rest", guest: id });
      }
    }
  }
  syncAll(state);

  for (const id of NON_HOLLOW) {
    const guest = state.guests[id];
    if (guest.status !== "waiting") continue;
    guest.bellsWaited += 1;
    if (guest.bellsWaited >= 2 && !guest.waitPenaltyApplied) {
      guest.waitPenaltyApplied = true;
      state.strain += 1;
      state.notices.push({ kind: "strain", reason: "wait" });
    }
  }

  if (state.guests.hollow.status === "waiting") {
    state.strain += 1;
    state.notices.push({ kind: "strain", reason: "hollow" });
  }

  const anyResting = GUEST_ORDER.some((id) => state.guests[id].status === "resting");
  if (state.oil === 0 && anyResting && !state.gutterApplied) {
    state.gutterApplied = true;
    state.strain += 1;
    state.notices.push({ kind: "strain", reason: "gutter" });
  }
}

function refreshProps(state: NightState): void {
  for (const prop of PROPS) {
    const loc = state.props[prop.id].location;
    if (loc === "tray") continue;
    const present = occupants(state, loc).some((id) => state.guests[id].status === "resting");
    if (present) continue;
    state.props[prop.id].location = "tray";
    state.rooms[loc].props = state.rooms[loc].props.filter((id) => id !== prop.id);
  }
  syncAll(state);
}

function advance(state: NightState): NightState {
  state.bell += 1;
  state.actionsLeft = NIGHT.actionsPerBell;
  state.eventsResolvedThisBell = false;
  state.pendingEventId = null;
  state.freeInviteRoom = null;
  state.dawnViaEnd = false;
  const arrivals = (NIGHT.arrivals as Record<string, GuestId[]>)[String(state.bell)] ?? [];
  for (const guest of arrivals) arrive(state, guest, state.bell);
  if (state.assist.propRefresh && state.bell === 4) refreshProps(state);
  if (state.assist.hostHints) {
    const mark = progressKey(state);
    state.hostHint = mark === state.progressMark;
    state.progressMark = mark;
    if (state.hostHint) state.notices.push({ kind: "hint" });
  } else {
    state.hostHint = false;
    state.progressMark = progressKey(state);
  }
  state.notices.push({ kind: "bell", bell: state.bell });
  return state;
}

function endBell(state: NightState): Result {
  const gate = blocked(state);
  if (gate && gate !== "event_pending") {
    if (state.pendingEventId) return fail(state, "event_pending");
    if (gate) return fail(state, gate);
  }
  if (state.pendingEventId) return fail(state, "event_pending");
  if (state.awaitingDawnConfirm) return fail(state, "illegal");
  if (state.phase !== "play" || state.dawnLocked) return fail(state, "dawn_locked");

  const next = structuredClone(state);
  next.notices = [];
  next.freeInviteRoom = null;

  if (next.bell >= 6) {
    next.awaitingDawnConfirm = true;
    next.dawnViaEnd = true;
    return ok(next);
  }

  const eventBells = NIGHT.eventBells as number[];
  const canDraw =
    eventBells.includes(next.bell) &&
    next.eventsDrawn < NIGHT.eventCap &&
    next.eventsDeck.length > 0 &&
    !next.eventsResolvedThisBell;
  if (canDraw) {
    const id = next.eventsDeck.shift()!;
    next.eventsDrawn += 1;
    next.notices.push({ kind: "event", id });
    // Double Knock means the bell is not over yet — no rest tick until the real end.
    if (id === "double_knock") {
      next.actionsLeft = Math.min(3, next.actionsLeft + 1);
      next.eventsResolvedThisBell = true;
      next.pendingEventId = id;
      return ok(next);
    }
    applyRestAndStrain(next);
    next.pendingEventId = id;
    return ok(next);
  }

  applyRestAndStrain(next);
  return ok(advance(next));
}

function mapOccupied(state: NightState): boolean {
  return occupants(state, "map_room").length > 0;
}

function resolveEvent(state: NightState, choice: "spend" | "drip" | "accept" | "continue"): Result {
  if (!state.pendingEventId) return fail(state, "illegal");
  if (state.phase !== "play" || state.dawnLocked) return fail(state, "dawn_locked");
  const next = structuredClone(state);
  next.notices = [];
  const id = next.pendingEventId as EventId;

  if (id === "roof_drip") {
    if (choice === "spend") {
      if (next.oil < 1) return fail(state, "not_enough_oil");
      next.oil -= 1;
    } else if (mapOccupied(next)) {
      next.strain += 1;
      next.notices.push({ kind: "strain", reason: "drip" });
    }
  } else if (id === "oil_gift") {
    next.oil += 2;
  } else if (id === "double_knock") {
    next.pendingEventId = null;
    return ok(next);
  } else if (id === "steady_wick") {
    next.steadyWick = true;
  }

  next.pendingEventId = null;
  return ok(advance(next));
}

function spendAction(state: NightState): void {
  state.actionsLeft -= 1;
}

export function createNight(options: CreateOptions = {}): NightState {
  const seed = options.seed ?? NIGHT.seed;
  const startOil = options.relaxedOil ? NIGHT.relaxedOil : NIGHT.startingOil;
  const rooms = {} as NightState["rooms"];
  for (const room of ROOMS) {
    rooms[room.id] = { lamp: room.start, props: [], seal: null };
  }
  const guests = {} as NightState["guests"];
  for (const id of GUEST_ORDER) guests[id] = blankGuest();
  const props = {} as NightState["props"];
  for (const prop of PROPS) props[prop.id] = { location: "tray" };

  const state: NightState = {
    seed,
    bell: 1,
    actionsLeft: NIGHT.actionsPerBell,
    oil: startOil,
    startOil,
    strain: NIGHT.startingStrain,
    harshSeals: 0,
    rooms,
    guests,
    props,
    eventsDeck: shuffle(EVENTS.map((e) => e.id), seed),
    eventsDrawn: 0,
    eventsResolvedThisBell: false,
    pendingEventId: null,
    steadyWick: false,
    hearthAward: null,
    gutterApplied: false,
    freeInviteRoom: null,
    hollowResolved: false,
    outcome: null,
    phase: "play",
    dawnLocked: false,
    awaitingDawnConfirm: false,
    dawnViaEnd: false,
    assist: {
      propRefresh: options.propRefresh ?? false,
      hostHints: options.hostHints ?? false,
    },
    hostHint: false,
    progressMark: "",
    notices: [],
  };
  arrive(state, "mira", 1);
  state.progressMark = progressKey(state);
  state.notices.push({ kind: "bell", bell: 1 });
  return state;
}

function doLight(state: NightState, room: RoomId): Result {
  const gate = blocked(state);
  if (gate) return fail(state, gate);
  if (room === "foyer") return fail(state, "foyer");
  if (state.rooms[room].seal) return fail(state, "sealed");
  if (state.rooms[room].lamp !== "unlit") return fail(state, "illegal");
  if (state.actionsLeft <= 0) return fail(state, "no_actions");
  const cost = lightCost(state);
  if (state.oil < cost) return fail(state, "not_enough_oil");
  const next = structuredClone(state);
  next.notices = [];
  next.oil -= cost;
  next.steadyWick = false;
  next.rooms[room].lamp = "lit";
  spendAction(next);
  return ok(next);
}

function doStage(state: NightState, room: RoomId, props: PropId[]): Result {
  const gate = blocked(state);
  if (gate) return fail(state, gate);
  if (room === "foyer") return fail(state, "foyer");
  const lamp = state.rooms[room].lamp;
  if (lamp !== "lit" && lamp !== "staged") return fail(state, "room_dark");
  if (!props || props.length < 1 || props.length > 2) return fail(state, "no_prop");
  if (new Set(props).size !== props.length) return fail(state, "bad_props");
  if (state.actionsLeft <= 0) return fail(state, "no_actions");
  for (const prop of props) {
    if (state.props[prop].location !== "tray") return fail(state, "bad_props");
  }
  const next = structuredClone(state);
  next.notices = [];
  for (const prop of props) {
    next.props[prop].location = room;
    next.rooms[room].props.push(prop);
  }
  next.rooms[room].lamp = "staged";
  next.freeInviteRoom = room;
  spendAction(next);
  return ok(next);
}

function doInvite(state: NightState, guest: GuestId, room: RoomId): Result {
  const gate = blocked(state);
  if (gate) return fail(state, gate);
  if (guest === "hollow") return fail(state, "cannot_rest");
  if (!canInvite(state, guest, room)) return fail(state, "guest_refuses_room");
  const free = state.freeInviteRoom === room;
  if (!free && state.actionsLeft <= 0) return fail(state, "no_actions");
  const next = structuredClone(state);
  next.notices = [];
  const how = guest === "bram" && room === "quiet_cell" ? "alternate" : "invite";
  seat(next, guest, room, how);
  syncAll(next);
  if (free) next.freeInviteRoom = null;
  else spendAction(next);
  return ok(next);
}

function doMediate(state: NightState, choice: "cadence" | "bram" | "share"): Result {
  const gate = blocked(state);
  if (gate) return fail(state, gate);
  if (!contentionOpen(state)) return fail(state, "nothing_to_mediate");
  if (state.actionsLeft <= 0) return fail(state, "no_actions");

  if (choice === "share") {
    if (state.rooms.hearth_hall.lamp === "unlit") return fail(state, "room_dark");
    const loc = state.props.workbench.location;
    if (loc !== "tray" && loc !== "hearth_hall") return fail(state, "workbench_missing");
    const next = structuredClone(state);
    next.notices = [];
    if (next.props.workbench.location === "tray") {
      next.props.workbench.location = "hearth_hall";
      next.rooms.hearth_hall.props.push("workbench");
    }
    next.hearthAward = "shared";
    seat(next, "cadence", "hearth_hall", "share");
    seat(next, "bram", "hearth_hall", "share");
    syncAll(next);
    next.notices.push({ kind: "award", who: "shared" });
    spendAction(next);
    return ok(next);
  }

  const next = structuredClone(state);
  next.notices = [];
  next.hearthAward = choice;
  if (choice === "cadence") evictIf(next, "bram", "hearth_hall");
  else evictIf(next, "cadence", "hearth_hall");
  syncAll(next);
  next.notices.push({ kind: "award", who: choice });
  spendAction(next);
  return ok(next);
}

function doClose(state: NightState, mode: "soft" | "harsh"): Result {
  const gate = blocked(state);
  if (gate) return fail(state, gate);
  if (state.actionsLeft <= 0) return fail(state, "no_actions");
  if (state.rooms.cellar.seal) return fail(state, "sealed");
  const next = structuredClone(state);
  next.notices = [];
  next.rooms.cellar.seal = mode;
  if (mode === "harsh") {
    next.harshSeals += 1;
    next.strain += 2;
    next.notices.push({ kind: "strain", reason: "close_harsh" });
  } else {
    next.strain += 1;
    next.notices.push({ kind: "strain", reason: "close_soft" });
  }
  markHollowDeparted(next);
  spendAction(next);
  return ok(next);
}

function doRefuse(state: NightState): Result {
  const gate = blocked(state);
  if (gate) return fail(state, gate);
  if (state.actionsLeft <= 0) return fail(state, "no_actions");
  if (state.guests.hollow.status !== "waiting") return fail(state, "not_hollow");
  const next = structuredClone(state);
  next.notices = [];
  next.guests.hollow.status = "departed_unfinished";
  next.guests.hollow.room = null;
  next.hollowResolved = true;
  next.strain += 1;
  next.notices.push({ kind: "strain", reason: "refuse" });
  spendAction(next);
  return ok(next);
}

function doRing(state: NightState): Result {
  if (state.phase !== "play" || state.dawnLocked) return fail(state, "dawn_locked");
  if (state.pendingEventId) return fail(state, "event_pending");
  if (!canRingDawn(state)) return fail(state, "dawn_not_ready");
  const next = structuredClone(state);
  next.notices = [];
  next.awaitingDawnConfirm = true;
  next.dawnViaEnd = false;
  return ok(next);
}

function doConfirm(state: NightState): Result {
  if (!state.awaitingDawnConfirm) return fail(state, "illegal");
  if (state.phase !== "play") return fail(state, "dawn_locked");
  const next = structuredClone(state);
  next.notices = [];
  if (next.dawnViaEnd) {
    applyRestAndStrain(next);
    next.dawnViaEnd = false;
  }
  next.outcome = evaluateOutcome(next);
  next.phase = "epilogue";
  next.dawnLocked = true;
  next.awaitingDawnConfirm = false;
  return ok(next);
}

function doCancelDawn(state: NightState): Result {
  if (!state.awaitingDawnConfirm) return fail(state, "illegal");
  const next = structuredClone(state);
  next.notices = [];
  next.awaitingDawnConfirm = false;
  next.dawnViaEnd = false;
  return ok(next);
}

export function applyAction(state: NightState, action: Action): Result {
  switch (action.type) {
    case "light":
      return doLight(state, action.room);
    case "stage":
      return doStage(state, action.room, action.props);
    case "invite":
      return doInvite(state, action.guest, action.room);
    case "mediate":
      return doMediate(state, action.choice);
    case "close":
      return doClose(state, action.mode);
    case "refuse":
      return doRefuse(state);
    case "endBell":
      return endBell(state);
    case "resolveEvent":
      return resolveEvent(state, action.choice);
    case "ringDawn":
      return doRing(state);
    case "confirmDawn":
      return doConfirm(state);
    case "cancelDawn":
      return doCancelDawn(state);
    default:
      return fail(state, "illegal");
  }
}

/** True when a just-staged room can still take a free Invite after actions hit 0. */
export function freeInviteAvailable(state: NightState): boolean {
  if (!state.freeInviteRoom || state.phase !== "play" || state.pendingEventId) return false;
  return GUEST_ORDER.some((id) => canInvite(state, id, state.freeInviteRoom!, true));
}
