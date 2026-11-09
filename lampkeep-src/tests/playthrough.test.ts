import { describe, expect, it } from "vitest";
import { applyAction, createNight } from "../src/game/engine";
import type { Action, NightState } from "../src/game/types";

function act(state: NightState, action: Action): NightState {
  const result = applyAction(state, action);
  if (!result.ok) {
    throw new Error(
      `${result.error} on ${action.type} bell ${state.bell} oil ${state.oil} actions ${state.actionsLeft} event ${state.pendingEventId}`,
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

function hostTheThree(state: NightState): NightState {
  let s = state;
  s = act(s, { type: "light", room: "map_room" });
  s = act(s, { type: "stage", room: "map_room", props: ["kettle", "map_table"] });
  s = act(s, { type: "invite", guest: "mira", room: "map_room" });
  s = end(s);
  s = act(s, { type: "light", room: "hearth_hall" });
  s = act(s, { type: "mediate", choice: "share" });
  s = end(s);
  s = act(s, { type: "light", room: "quiet_cell" });
  s = end(s);
  return s;
}

describe("scripted nights", () => {
  it("plays Night of Soft Rain to a warm or perfect dawn", () => {
    let s = hostTheThree(createNight());
    expect(s.bell).toBe(4);
    expect(s.guests.mira.status).toBe("leave_ready");
    expect(s.guests.cadence.status).toBe("leave_ready");
    expect(s.guests.bram.status).toBe("leave_ready");
    expect(s.guests.hollow.status).toBe("waiting");

    s = act(s, { type: "refuse" });
    expect(s.guests.hollow.status).toBe("departed_unfinished");
    s = end(s);
    expect(s.bell).toBe(5);
    s = end(s);
    expect(s.bell).toBe(6);

    s = act(s, { type: "ringDawn" });
    s = act(s, { type: "confirmDawn" });
    expect(s.phase).toBe("epilogue");
    expect(s.dawnLocked).toBe(true);
    expect(s.outcome === "warm" || s.outcome === "perfect").toBe(true);

    const undone = applyAction(s, { type: "light", room: "balcony" });
    expect(undone.ok).toBe(false);
  });

  it("still reaches an epilogue if the Hollow Guest lingers", () => {
    let s = hostTheThree(createNight());
    expect(s.guests.hollow.status).toBe("waiting");
    const base = s.strain;
    s = end(s);
    expect(s.bell).toBe(5);
    s = end(s);
    expect(s.bell).toBe(6);
    expect(s.strain).toBe(base + 2);
    s = act(s, { type: "endBell" });
    expect(s.awaitingDawnConfirm).toBe(true);
    s = act(s, { type: "confirmDawn" });
    expect(s.strain).toBe(base + 3);
    expect(s.phase).toBe("epilogue");
    expect(s.outcome === "strained" || s.outcome === "failed").toBe(true);
  });
});
