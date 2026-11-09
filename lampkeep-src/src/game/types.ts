export const ROOM_ORDER = [
  "balcony",
  "map_room",
  "hearth_hall",
  "quiet_cell",
  "foyer",
  "cellar",
] as const;
export type RoomId = (typeof ROOM_ORDER)[number];

export const GUEST_ORDER = ["mira", "cadence", "bram", "hollow"] as const;
export type GuestId = (typeof GUEST_ORDER)[number];

export const PROP_ORDER = [
  "kettle",
  "map_table",
  "spare_cloak",
  "workbench",
  "soft_quill",
  "trail_stamp",
] as const;
export type PropId = (typeof PROP_ORDER)[number];

export const NON_HOLLOW: GuestId[] = ["mira", "cadence", "bram"];

export type Lamp = "unlit" | "lit" | "staged" | "occupied" | "leave_ready";
export type Seal = null | "soft" | "harsh";
export type GuestStatus =
  | "absent"
  | "waiting"
  | "resting"
  | "leave_ready"
  | "departed_complete"
  | "departed_unfinished";

export type EventId = "roof_drip" | "oil_gift" | "double_knock" | "steady_wick";
export type OutcomeId = "perfect" | "warm" | "strained" | "failed";
export type HearthAward = null | "cadence" | "bram" | "shared";

export type ErrorCode =
  | "not_enough_oil"
  | "room_dark"
  | "no_prop"
  | "bad_props"
  | "guest_refuses_room"
  | "nothing_to_mediate"
  | "dawn_not_ready"
  | "no_night"
  | "undo_empty"
  | "no_actions"
  | "event_pending"
  | "sealed"
  | "workbench_missing"
  | "illegal"
  | "foyer"
  | "not_hollow"
  | "dawn_locked"
  | "cannot_rest";

export interface RoomState {
  lamp: Lamp;
  props: PropId[];
  seal: Seal;
}

export interface GuestState {
  status: GuestStatus;
  room: RoomId | null;
  arrivedBell: number | null;
  bellsWaited: number;
  waitPenaltyApplied: boolean;
  restProgress: number;
}

export interface PropState {
  location: "tray" | RoomId;
}

export type Notice =
  | { kind: "arrival"; guest: GuestId }
  | { kind: "bell"; bell: number }
  | { kind: "strain"; reason: "wait" | "hollow" | "gutter" | "drip" | "close_soft" | "close_harsh" | "refuse" }
  | { kind: "rest"; guest: GuestId }
  | { kind: "event"; id: EventId }
  | { kind: "seat"; guest: GuestId; how: "invite" | "share" | "alternate" }
  | { kind: "award"; who: "cadence" | "bram" | "shared" }
  | { kind: "hint" };

export interface AssistFlags {
  propRefresh: boolean;
  hostHints: boolean;
}

export interface NightState {
  seed: string;
  bell: number;
  actionsLeft: number;
  oil: number;
  startOil: number;
  strain: number;
  harshSeals: number;
  rooms: Record<RoomId, RoomState>;
  guests: Record<GuestId, GuestState>;
  props: Record<PropId, PropState>;
  eventsDeck: EventId[];
  eventsDrawn: number;
  eventsResolvedThisBell: boolean;
  pendingEventId: EventId | null;
  steadyWick: boolean;
  hearthAward: HearthAward;
  gutterApplied: boolean;
  freeInviteRoom: RoomId | null;
  hollowResolved: boolean;
  outcome: OutcomeId | null;
  phase: "play" | "epilogue";
  dawnLocked: boolean;
  awaitingDawnConfirm: boolean;
  dawnViaEnd: boolean;
  assist: AssistFlags;
  hostHint: boolean;
  progressMark: string;
  notices: Notice[];
}

export type Action =
  | { type: "light"; room: RoomId }
  | { type: "stage"; room: RoomId; props: PropId[] }
  | { type: "invite"; guest: GuestId; room: RoomId }
  | { type: "mediate"; choice: "cadence" | "bram" | "share" }
  | { type: "close"; mode: "soft" | "harsh" }
  | { type: "refuse" }
  | { type: "endBell" }
  | { type: "resolveEvent"; choice: "spend" | "drip" | "accept" | "continue" }
  | { type: "ringDawn" }
  | { type: "confirmDawn" }
  | { type: "cancelDawn" };

export type Result =
  | { ok: true; state: NightState }
  | { ok: false; error: ErrorCode; state: NightState };

export interface CreateOptions {
  seed?: string;
  relaxedOil?: boolean;
  propRefresh?: boolean;
  hostHints?: boolean;
}
