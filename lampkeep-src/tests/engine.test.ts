import { describe, expect, it } from "vitest";
import { STRINGS } from "../src/game/content";
import { applyAction, createNight, lightCost } from "../src/game/engine";
import { evaluateOutcome } from "../src/game/outcomes";
import { migrate } from "../src/game/save";
import { popSnapshot, pushSnapshot, UNDO_CAP } from "../src/game/undo";
import type { Action, GuestId, NightState } from "../src/game/types";

function act(state: NightState, action: Action): NightState {
  const result = applyAction(state, action);
  if (!result.ok) {
    throw new Error(
      `${result.error} on ${action.type} bell ${state.bell} oil ${state.oil} actions ${state.actionsLeft}`,
    );
  }
  return result.state;
}

function resolvePending(state: NightState): NightState {
  let guard = 0;
  while (state.pendingEventId && guard++ < 6) {
    const id = state.pendingEventId;
    const choice = id === "roof_drip" ? "spend" : id === "oil_gift" ? "accept" : "continue";
    state = act(state, { type: "resolveEvent", choice });
    if (id === "double_knock") state = act(state, { type: "endBell" });
  }
  return state;
}

function end(state: NightState): NightState {
  return resolvePending(act(state, { type: "endBell" }));
}

/** Seat Mira, then share the hearth so Cadence and Bram are resting or ready. */
function seatMainThree(state: NightState): NightState {
  let s = state;
  s = act(s, { type: "light", room: "map_room" });
  s = act(s, { type: "stage", room: "map_room", props: ["kettle", "map_table"] });
  s = act(s, { type: "invite", guest: "mira", room: "map_room" });
  s = end(s);
  s = act(s, { type: "light", room: "hearth_hall" });
  s = act(s, { type: "mediate", choice: "share" });
  s = end(s);
  return s;
}

describe("lamp rules", () => {
  it("lights for 2 oil and refuses a light under 2", () => {
    let s = createNight();
    expect(lightCost(s)).toBe(2);
    s = act(s, { type: "light", room: "map_room" });
    expect(s.oil).toBe(10);
    expect(s.rooms.map_room.lamp).toBe("lit");

    const poor = structuredClone(s);
    poor.oil = 1;
    const denied = applyAction(poor, { type: "light", room: "balcony" });
    expect(denied.ok).toBe(false);
    if (!denied.ok) expect(denied.error).toBe("not_enough_oil");
    expect(denied.state.oil).toBe(1);
    expect(denied.state.rooms.balcony.lamp).toBe("unlit");
  });

  it("stages props and invites Mira to rest", () => {
    let s = createNight();
    s = act(s, { type: "light", room: "map_room" });
    s = act(s, { type: "stage", room: "map_room", props: ["kettle", "map_table"] });
    expect(s.props.kettle.location).toBe("map_room");
    expect(s.props.map_table.location).toBe("map_room");
    expect(s.rooms.map_room.lamp).toBe("staged");
    s = act(s, { type: "invite", guest: "mira", room: "map_room" });
    expect(s.guests.mira.status).toBe("resting");
    expect(s.guests.mira.room).toBe("map_room");
    expect(s.rooms.map_room.lamp).toBe("occupied");
  });

  it("completes Mira's rest on End Bell", () => {
    let s = createNight();
    s = act(s, { type: "light", room: "map_room" });
    s = act(s, { type: "stage", room: "map_room", props: ["kettle"] });
    s = act(s, { type: "invite", guest: "mira", room: "map_room" });
    s = act(s, { type: "endBell" });
    expect(s.guests.mira.status).toBe("leave_ready");
    expect(s.bell === 2 || s.pendingEventId !== null).toBe(true);
  });

  it("shares the hearth and seats Cadence and Bram", () => {
    let s = createNight();
    s = end(s);
    expect(s.bell).toBe(2);
    s = act(s, { type: "light", room: "hearth_hall" });
    s = act(s, { type: "mediate", choice: "share" });
    expect(s.hearthAward).toBe("shared");
    expect(s.guests.cadence.status).toBe("resting");
    expect(s.guests.bram.status).toBe("resting");
    expect(s.guests.cadence.room).toBe("hearth_hall");
    expect(s.guests.bram.room).toBe("hearth_hall");
    expect(s.props.workbench.location).toBe("hearth_hall");
  });

  it("adds strain when the Hollow Guest is still waiting at End Bell", () => {
    let s = seatMainThree(createNight());
    s = end(s);
    expect(s.bell).toBe(4);
    expect(s.guests.hollow.status).toBe("waiting");
    const before = s.strain;
    const ended = act(s, { type: "endBell" });
    expect(ended.strain).toBe(before + 1);
    expect(ended.notices.some((n) => n.kind === "strain" && n.reason === "hollow")).toBe(true);
  });

  it("refuses the Hollow Guest", () => {
    let s = seatMainThree(createNight());
    s = end(s);
    const before = s.strain;
    s = act(s, { type: "refuse" });
    expect(s.strain).toBe(before + 1);
    expect(s.guests.hollow.status).toBe("departed_unfinished");
    expect(s.hollowResolved).toBe(true);
  });

  it("soft-closes the cellar", () => {
    let s = createNight();
    const before = s.strain;
    s = act(s, { type: "close", mode: "soft" });
    expect(s.strain).toBe(before + 1);
    expect(s.rooms.cellar.seal).toBe("soft");
    expect(s.harshSeals).toBe(0);
    expect(s.guests.hollow.status).toBe("departed_unfinished");
  });

  it("harsh-closes the cellar", () => {
    let s = createNight();
    s = act(s, { type: "close", mode: "harsh" });
    expect(s.strain).toBe(2);
    expect(s.harshSeals).toBe(1);
    expect(s.rooms.cellar.seal).toBe("harsh");
  });

  it("scores perfect, warm, strained, and failed", () => {
    const base = (): NightState => {
      const s = createNight();
      for (const id of ["mira", "cadence", "bram"] as GuestId[]) {
        s.guests[id].status = "leave_ready";
      }
      s.guests.hollow.status = "departed_unfinished";
      s.oil = 4;
      s.strain = 1;
      s.harshSeals = 0;
      s.bell = 6;
      return s;
    };

    expect(evaluateOutcome(base())).toBe("perfect");

    const warm = base();
    warm.strain = 2;
    expect(evaluateOutcome(warm)).toBe("warm");

    const dry = base();
    dry.oil = 0;
    dry.strain = 0;
    expect(evaluateOutcome(dry)).toBe("warm");

    const harsh = base();
    harsh.harshSeals = 1;
    expect(evaluateOutcome(harsh)).toBe("warm");

    const strained = base();
    strained.strain = 3;
    expect(evaluateOutcome(strained)).toBe("strained");

    const unfinished = base();
    unfinished.guests.bram.status = "waiting";
    unfinished.strain = 0;
    unfinished.bell = 5;
    expect(evaluateOutcome(unfinished)).toBe("strained");

    const failedStrain = base();
    failedStrain.strain = 5;
    expect(evaluateOutcome(failedStrain)).toBe("failed");

    const failedDawn = base();
    failedDawn.guests.mira.status = "resting";
    failedDawn.strain = 1;
    failedDawn.bell = 6;
    expect(evaluateOutcome(failedDawn)).toBe("failed");
  });

  it("undo restores oil, room, and guest", () => {
    const start = createNight();
    let stack = pushSnapshot([], start);
    const lit = act(start, { type: "light", room: "map_room" });
    expect(lit.oil).toBe(10);
    const undone = popSnapshot(stack);
    expect(undone).not.toBeNull();
    expect(undone!.state.oil).toBe(12);
    expect(undone!.state.rooms.map_room.lamp).toBe("unlit");
    stack = pushSnapshot(undone!.stack, undone!.state);
    const staged = act(undone!.state, { type: "light", room: "map_room" });
    const invited = act(
      act(staged, { type: "stage", room: "map_room", props: ["kettle"] }),
      { type: "invite", guest: "mira", room: "map_room" },
    );
    stack = pushSnapshot(stack, staged);
    const back = popSnapshot(stack);
    expect(back!.state.guests.mira.status).toBe("waiting");
    expect(back!.state.props.kettle.location).toBe("tray");
    expect(invited.guests.mira.status).toBe("resting");
  });

  it("caps the undo stack at 30", () => {
    let stack: NightState[] = [];
    const s = createNight();
    for (let i = 0; i < 40; i++) stack = pushSnapshot(stack, s);
    expect(stack.length).toBe(UNDO_CAP);
  });

  it("starts Relaxed Oil at 16", () => {
    const s = createNight({ relaxedOil: true });
    expect(s.oil).toBe(16);
    expect(s.startOil).toBe(16);
  });

  it("adds 2 oil for A Kind Flask", () => {
    let s = createNight();
    s.bell = 2;
    s.eventsDeck = ["oil_gift", "roof_drip", "double_knock", "steady_wick"];
    s.eventsDrawn = 0;
    s.eventsResolvedThisBell = false;
    const before = s.oil;
    s = act(s, { type: "endBell" });
    expect(s.pendingEventId).toBe("oil_gift");
    s = act(s, { type: "resolveEvent", choice: "accept" });
    expect(s.oil).toBe(before + 2);
  });

  it("charges Bram's waiting strain once after two bells", () => {
    let s = createNight();
    s = act(s, { type: "light", room: "map_room" });
    s = act(s, { type: "stage", room: "map_room", props: ["kettle"] });
    s = act(s, { type: "invite", guest: "mira", room: "map_room" });
    s = end(s);
    expect(s.bell).toBe(2);
    s = act(s, { type: "light", room: "hearth_hall" });
    s = act(s, { type: "stage", room: "hearth_hall", props: ["workbench"] });
    s = act(s, { type: "invite", guest: "cadence", room: "hearth_hall" });
    s = end(s);
    expect(s.guests.bram.status).toBe("waiting");
    expect(s.guests.bram.bellsWaited).toBe(1);
    expect(s.guests.bram.waitPenaltyApplied).toBe(false);
    const before = s.strain;
    s = end(s);
    expect(s.guests.bram.bellsWaited).toBe(2);
    expect(s.guests.bram.waitPenaltyApplied).toBe(true);
    expect(s.strain).toBe(before + 1);
    const afterPenalty = s.strain;
    s = end(s);
    const hollowOnly = s.notices.filter((n) => n.kind === "strain" && n.reason === "wait");
    expect(hollowOnly.length).toBe(0);
    expect(s.guests.bram.waitPenaltyApplied).toBe(true);
    expect(s.strain).toBeGreaterThanOrEqual(afterPenalty);
    const bramWaits = s.strain - afterPenalty;
    expect(bramWaits === 0 || bramWaits === 1).toBe(true);
    if (s.guests.hollow.status === "waiting") {
      expect(s.strain).toBe(afterPenalty + 1);
    }
  });
});

describe("save migration", () => {
  it("drops an unknown version but keeps assists", () => {
    const migrated = migrate({
      v: 9,
      assists: { relaxedOil: true, showCosts: false, reducedMotion: true },
      night: { bell: 3 },
    });
    expect(migrated).not.toBeNull();
    expect(migrated!.night).toBeNull();
    expect(migrated!.assists.relaxedOil).toBe(true);
    expect(migrated!.assists.showCosts).toBe(false);
    expect(migrated!.assists.reducedMotion).toBe(true);
  });
});

describe("shipped copy", () => {
  it("has no contact placeholders or employer claims", () => {
    const blob = JSON.stringify(STRINGS);
    expect(blob).not.toContain("TO CONFIRM");
    expect(blob.toLowerCase()).not.toContain("spacex");
    expect(blob.toLowerCase()).not.toContain("amazon");
    expect(blob.toLowerCase()).not.toContain("linkedin");
    expect(blob).not.toContain("@");
  });
});
