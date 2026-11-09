import { describe, expect, it } from "vitest";
import { careerPageHtml } from "../src/content/careerPage";
import { migrate, SAVE_KEY, loadSave, saveState, type KeyValueStore } from "../src/save/storage";

function mem(): KeyValueStore {
  const box = new Map<string, string>();
  return {
    getItem: (key) => box.get(key) ?? null,
    setItem: (key, value) => void box.set(key, value),
    removeItem: (key) => void box.delete(key),
  };
}

describe("save migration", () => {
  it("keeps settings from the v3 slice and drops combat progress", () => {
    const next = migrate({
      v: 1,
      checkpointId: "trail_shrine",
      assists: { master: false, damageAssist: true, extraIframes: true, softLock: true, slowCombat: true },
      bindings: { pause: ["KeyP"] },
      fov: 70,
      reducedMotion: true,
      textureWobble: true,
    });
    expect(next?.version).toBe(4);
    expect(next?.settings.reducedMotion).toBe(true);
    expect(next?.settings.assists.endlessLamp).toBe(false);
    expect(next?.settings.assists.gentleThicket).toBe(false);
    expect(next?.litBraziers).toEqual([]);
    expect(next?.foundIds).toEqual([]);
    expect(JSON.stringify(next)).not.toContain("checkpointId");
    expect(JSON.stringify(next)).not.toContain("trail_shrine");
  });

  it("round-trips v4 and reads a legacy key", () => {
    const store = mem();
    const saved = migrate({ version: 4, foundIds: ["C1"], litBraziers: ["BR1"], lastBrazier: "BR1", settings: { assists: { endlessLamp: false } } });
    expect(saved).toBeTruthy();
    saveState(saved!, store);
    expect(loadSave(store)?.foundIds).toEqual(["C1"]);
    expect(loadSave(store)?.settings.assists.stonesStay).toBe(true);
    const legacy = mem();
    legacy.setItem("lampkeep.v3.slice", JSON.stringify({ v: 1, assists: { master: true }, reducedMotion: false }));
    const loaded = loadSave(legacy);
    expect(loaded?.version).toBe(4);
    expect(loaded?.settings.assists.autoMantle).toBe(true);
    expect(legacy.getItem(SAVE_KEY)).toContain("\"version\":4");
  });
});

describe("career page", () => {
  it("ships no placeholder copy", () => {
    const html = careerPageHtml(false);
    expect(html).toContain("Spencer Sweeney");
    expect(html).toContain("Software engineer at SpaceX.");
    expect(html).toContain("spencersweeney@gmail.com");
    expect(html).not.toMatch(/PLACEHOLDER|TODO|TO CONFIRM|\btodo\b/);
    expect(html).not.toContain("Download resume");
  });
});
