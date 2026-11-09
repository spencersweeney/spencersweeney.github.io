import { describe, expect, it } from "vitest";
import { career, publishedText, shipItems, validateCareer } from "../src/content/career";
import { demoInput } from "../src/app/demoPolicy";
import { GATEWICK_ORDER, THICKET_ENTRANCE } from "../src/world/level";
import {
  DEFAULT_ASSISTS,
  FLARE_CD,
  FLARE_COST,
  GLIDE_VY,
  JUMP_VY,
  LAMP_DRAIN,
  MANTLE_MAX,
  MANTLE_MIN,
  REFILL_RATE,
  STONE_LINGER,
  UPDRAFT_VY,
  Valley,
  mainCareerIds,
} from "../src/world/valley";

const dt = 1 / 60;
const off = { ...DEFAULT_ASSISTS, endlessLamp: false, stonesStay: false, autoMantle: true, gentleThicket: false, hintPulses: true };

describe("lamp", () => {
  it("drains while raised, refills by a lit brazier, and flare has a cooldown", () => {
    const v = new Valley({ dev: false, assists: off });
    v.step(1, { ...demoInput(v), lamp: true, flare: false, moveY: 0, jump: false, interact: false });
    expect(v.lamp).toBeCloseTo(100 - LAMP_DRAIN, 1);
    v.lamp = FLARE_COST;
    v.step(dt, { ...demoInput(v), flare: true, lamp: false, moveY: 0, jump: false, interact: false });
    expect(v.lamp).toBeCloseTo(0, 1);
    expect(v.flareCd).toBeCloseTo(FLARE_CD, 2);
    v.player.x = 0;
    v.player.z = 6;
    v.light("BR1");
    v.lamp = 10;
    v.step(0.5, { ...demoInput(v), lamp: false, flare: false, moveY: 0, jump: false, interact: false });
    expect(v.lamp).toBeCloseTo(10 + REFILL_RATE * 0.5, 0);
  });
});

describe("old stones", () => {
  it("reveals in lamplight, lingers 6s, and can stay", () => {
    const v = new Valley({ dev: false, assists: { ...off, endlessLamp: true } });
    v.player.x = 3;
    v.player.z = 22;
    v.step(0.1, { ...zero(), lamp: true });
    expect(v.stones[0]?.solid).toBe(true);
    v.player.z = 0;
    v.step(STONE_LINGER + 0.1, { ...zero(), lamp: false });
    expect(v.stones[0]?.solid).toBe(false);
    const stay = new Valley({ dev: false, assists: { ...off, endlessLamp: true, stonesStay: true } });
    stay.player.x = 3;
    stay.player.z = 22;
    stay.step(0.05, { ...zero(), lamp: true });
    stay.player.z = 0;
    stay.step(30, { ...zero() });
    expect(stay.stones[0]?.solid).toBe(true);
  });
});

describe("glide, updraft, mantle", () => {
  it("caps glide fall and lifts in an updraft", () => {
    const v = new Valley({ dev: false, assists: off });
    v.player.grounded = false;
    v.player.y = 20;
    v.player.vy = -8;
    v.step(1, { ...zero(), jump: true });
    expect(v.player.vy).toBeGreaterThan(GLIDE_VY - 0.05);
    expect(v.player.vy).toBeLessThan(0);
    v.light("BR5");
    v.player.x = -8;
    v.player.z = 152;
    v.player.y = 30;
    v.player.vy = -1;
    v.step(0.2, { ...zero(), jump: true });
    expect(v.player.vy).toBeCloseTo(UPDRAFT_VY, 1);
  });

  it("mantles only inside 0.6 to 1.8 m", () => {
    const v = new Valley({ dev: false, assists: { ...off, autoMantle: true, endlessLamp: true } });
    v.player.x = 22;
    v.player.y = 2;
    v.player.z = 42;
    v.player.grounded = true;
    const yaw = Math.atan2(16 - 22, 46 - 42);
    for (let i = 0; i < 40; i++) v.step(dt, { ...zero(), moveY: 1, moveYaw: yaw, run: true });
    expect(v.player.mantle > 0 || v.player.y > 2.5).toBe(true);
    expect(MANTLE_MIN).toBe(0.6);
    expect(MANTLE_MAX).toBe(1.8);
    expect(JUMP_VY).toBeGreaterThan(4.5);
  });
});

describe("thicket", () => {
  it("respawns after 3 bumps, keeps dispelled sprites, and hides the meter outside", () => {
    const v = new Valley({ dev: false, assists: { ...off, gentleThicket: false } });
    expect(v.sprites.filter((s) => s.enabled).length).toBe(3);
    v.player.x = 48;
    v.player.y = 2;
    v.player.z = 80;
    v.inThicket = true;
    const sprite = v.sprites[0]!;
    sprite.state = "charge";
    for (let i = 0; i < 3; i++) {
      v["bump"](sprite);
    }
    expect(v.thicketPips).toBe(0);
    expect(v.scatter).toBeGreaterThan(0);
    v.sprites[1]!.dispelled = true;
    v.step(1, zero());
    expect(v.player.x).toBeCloseTo(THICKET_ENTRANCE.x, 1);
    expect(v.thicketPips).toBe(3);
    expect(v.sprites[1]!.dispelled).toBe(true);
    expect(v.inThicket).toBe(false);
    const gentle = new Valley({ dev: false });
    expect(gentle.sprites.filter((s) => s.enabled).length).toBe(2);
  });
});

describe("gatewick", () => {
  it("wakes on the right order, resets on a wrong light, and cannot fail", () => {
    const v = new Valley({ dev: false });
    v.light("B3");
    expect(v.lit.has("B3")).toBe(false);
    expect(v.wrongs).toBe(1);
    expect(v.toast).toContain("gutter");
    v.light("B1");
    expect(v.wrongs).toBe(2);
    expect(v.hintId()).toBe(GATEWICK_ORDER[0]);
    for (const id of GATEWICK_ORDER) v.light(id);
    expect(v.updrafts).toBe(true);
    expect(v.woken).toBe(false);
    v.player.x = 0;
    v.player.y = 52;
    v.player.z = 192;
    v.step(3.1, { ...zero(), lamp: true });
    expect(v.woken).toBe(true);
    expect(v.archiveOpen).toBe(true);
  });
});

describe("career file", () => {
  it("validates and ships no placeholder copy", () => {
    expect(validateCareer()).toEqual([]);
    expect(shipItems(false).some((item) => item.status !== "approved")).toBe(false);
    expect(shipItems(true).some((item) => item.id === "C5")).toBe(true);
    const text = publishedText(false);
    expect(text).toContain("Software engineer at SpaceX.");
    expect(text).not.toMatch(/PLACEHOLDER|TODO|TO CONFIRM|\btodo\b/);
    expect(career.contact.details?.map((d) => d.value)).toEqual([
      "spencersweeney@gmail.com",
      "+1 (978) 407-7432",
      "https://www.linkedin.com/in/spencer-sweeney/",
    ]);
  });
});

describe("scripted route", () => {
  it("reaches the archive with the main-path career pages and skips the thicket", () => {
    const v = new Valley({ dev: false });
    let guard = 0;
    while (!v.endCard && v.time < 180 && guard < 180 * 60) {
      v.step(dt, demoInput(v));
      guard += 1;
    }
    if (!v.endCard) {
      throw new Error(JSON.stringify({
        t: +v.time.toFixed(1),
        pos: [v.player.x, v.player.y, v.player.z].map((n) => +n.toFixed(2)),
        lit: [...v.lit],
        found: [...v.found],
        bridge: v.bridge,
        up: v.updrafts,
        woken: v.woken,
        prompt: v.prompt,
        toast: v.toast,
      }));
    }
    for (const id of mainCareerIds(false)) expect(v.found.has(id)).toBe(true);
    expect(v.found.has("P2")).toBe(false);
    expect(v.thicketCleared).toBe(false);
    expect(v.player.x).toBeLessThan(38);
  });
});

function zero() {
  return { moveX: 0, moveY: 0, lookX: 0, lookY: 0, jump: false, lamp: false, flare: false, interact: false, run: false, dismiss: false };
}
