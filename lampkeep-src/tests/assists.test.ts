import { describe, expect, it } from "vitest";
import { DEFAULT_ASSISTS, effectiveAssists, type AssistSettings } from "../src/content/assists";
import { tryHurtPlayer } from "../src/player/Combat";
import type { PlayerState } from "../src/world/types";
import { loadSave, saveState, type SaveData } from "../src/save/storage";

function player(): PlayerState {
  return {
    x: 0, y: 0, z: 0, yaw: 0, vy: 0, hp: 3, oil: 100, grounded: true,
    attack: { phase: "idle", t: 0, hitIds: [] },
    dodging: false, dodgeT: 0, dodgeDx: 0, dodgeDz: 1, dodgeCd: 0,
    iframes: 0, hurtT: 0, kbx: 0, kbz: 0, kbT: 0,
    flaring: false, flareT: 0, flareHitIds: [], alive: true, moving: false,
  };
}

describe("assists", () => {
  it("defaults to half damage, 300 ms dodges, and the other recommended assists", () => {
    const on = effectiveAssists(DEFAULT_ASSISTS);
    expect(on.damageTakenMult).toBe(0.5);
    expect(on.dodgeIframesMs).toBe(300);
    expect(on.telegraphBonusMs).toBe(150);
    expect(on.softLock).toBe(true);
    expect(on.cameraRecenter).toBe(true);
    expect(on.showPrompts).toBe(true);
    expect(on.slowCombat).toBe(false);
  });

  it("master off restores challenge values", () => {
    const off = effectiveAssists({ ...DEFAULT_ASSISTS, master: false });
    expect(off.damageTakenMult).toBe(1);
    expect(off.dodgeIframesMs).toBe(220);
    expect(off.telegraphBonusMs).toBe(0);
    expect(off.softLock).toBe(false);
    expect(off.cameraRecenter).toBe(false);
    expect(off.showPrompts).toBe(false);
  });

  it("damage assist halves a landed hit and can be turned off under the master", () => {
    const helped = player();
    tryHurtPlayer(helped, 1, 1, 0, effectiveAssists(DEFAULT_ASSISTS).damageTakenMult);
    expect(helped.hp).toBe(2.5);

    const settings: AssistSettings = { ...DEFAULT_ASSISTS, damageAssist: false };
    const plain = player();
    tryHurtPlayer(plain, 1, 1, 0, effectiveAssists(settings).damageTakenMult);
    expect(plain.hp).toBe(2);
  });
});

describe("save", () => {
  it("round-trips the v3 slice and reset keeps assist prefs", () => {
    const mem = new Map<string, string>();
    const store = {
      getItem: (k: string) => mem.get(k) ?? null,
      setItem: (k: string, v: string) => void mem.set(k, v),
      removeItem: (k: string) => void mem.delete(k),
    };
    const data: SaveData = {
      v: 1,
      checkpointId: "gate_threshold",
      assists: { ...DEFAULT_ASSISTS, master: false },
      bindings: { attack: ["KeyH"] },
      fov: 68,
      reducedMotion: true,
      textureWobble: false,
      updatedAt: "2026-11-09T00:00:00.000Z",
    };
    saveState(data, store);
    expect(loadSave(store)?.checkpointId).toBe("gate_threshold");
    expect(loadSave(store)?.fov).toBe(68);
    expect(loadSave(store)?.assists.master).toBe(false);

    const reset: SaveData = { ...loadSave(store)!, checkpointId: "spawn", updatedAt: "2026-11-09T01:00:00.000Z" };
    saveState(reset, store);
    const again = loadSave(store)!;
    expect(again.checkpointId).toBe("spawn");
    expect(again.assists.master).toBe(false);
    expect(again.fov).toBe(68);
  });
});
