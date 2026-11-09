import { describe, expect, it } from "vitest";
import { DEFAULT_ASSISTS } from "../src/content/assists";
import { freshAttack, startAttack, startDodge, stepAttack, stepDodge, tryHurtPlayer } from "../src/player/Combat";
import { flareEffect, regenOil, trySpendOil } from "../src/player/LampFlare";
import { gatewickPhase } from "../src/enemies/EnemyBase";
import { telegraphDurationMs } from "../src/content/assists";
import { MistRoad } from "../src/world/MistRoadLevel";
import { IDLE_INPUT } from "../src/world/types";
import type { PlayerState } from "../src/world/types";

function barePlayer(): PlayerState {
  return {
    x: 0, y: 0, z: 0, yaw: 0, vy: 0, hp: 3, oil: 100, grounded: true,
    attack: freshAttack(), dodging: false, dodgeT: 0, dodgeDx: 0, dodgeDz: 1,
    dodgeCd: 0, iframes: 0, hurtT: 0, kbx: 0, kbz: 0, kbT: 0,
    flaring: false, flareT: 0, flareHitIds: [], alive: true, moving: false,
  };
}

describe("attack timing", () => {
  it("applies 1 damage once during the active window of a swing", () => {
    const a = freshAttack();
    startAttack(a);
    let hits = 0;
    const strike = () => [{ id: "gorse", hit: () => { hits += 1; } }];

    stepAttack(a, 0.079, strike());
    expect(a.phase).toBe("windup");
    expect(hits).toBe(0);

    stepAttack(a, 0.002, strike());
    expect(a.phase).toBe("active");
    expect(hits).toBe(1);

    stepAttack(a, 0.05, strike());
    expect(hits).toBe(1);

    stepAttack(a, 0.3, strike());
    expect(a.phase).toBe("idle");
    expect(hits).toBe(1);

    startAttack(a);
    stepAttack(a, 0.09, strike());
    expect(hits).toBe(2);
  });

  it("damages a gorse once per swing in the world", () => {
    const w = new MistRoad(DEFAULT_ASSISTS);
    w.debugFreezeAI = true;
    const g = w.enemies[0];
    for (const e of w.enemies) if (e !== g && e.kind !== "gatewick") e.alive = false;
    w.player.x = g.x;
    w.player.z = g.z - 1.15;
    w.player.yaw = 0;
    w.step(1 / 60, { ...IDLE_INPUT, attack: true, aimYaw: 0 });
    expect(g.hp).toBe(g.maxHp);
    for (let i = 0; i < 30; i++) w.step(1 / 60, { ...IDLE_INPUT, aimYaw: 0 });
    expect(g.hp).toBe(g.maxHp - 1);
    expect(w.player.attack.phase).toBe("idle");
  });
});

describe("dodge i-frames", () => {
  it("blocks damage only inside the assist-on window (300 ms)", () => {
    const p = barePlayer();
    expect(startDodge(p, 0, 1, 0.3)).toBe(true);
    expect(tryHurtPlayer(p, 1, 1, 0, 1)).toBe(false);
    stepDodge(p, 0.299);
    expect(p.iframes).toBeGreaterThan(0);
    expect(tryHurtPlayer(p, 1, 1, 0, 1)).toBe(false);
    stepDodge(p, 0.002);
    expect(p.iframes).toBe(0);
    expect(tryHurtPlayer(p, 1, 1, 0, 1)).toBe(true);
    expect(p.hp).toBe(2);
  });

  it("blocks damage only inside the assist-off window (220 ms)", () => {
    const p = barePlayer();
    startDodge(p, 1, 0, 0.22);
    stepDodge(p, 0.219);
    expect(tryHurtPlayer(p, 1, -1, 0, 1)).toBe(false);
    stepDodge(p, 0.002);
    expect(tryHurtPlayer(p, 1, -1, 0, 1)).toBe(true);
    expect(p.hp).toBe(2);
  });
});

describe("flare oil", () => {
  it("spends 25 and regen clamps between 0 and 100", () => {
    expect(trySpendOil(100)).toBe(75);
    expect(trySpendOil(25)).toBe(0);
    expect(trySpendOil(24.9)).toBeNull();
    expect(trySpendOil(0)).toBeNull();
    expect(regenOil(100, 3, false)).toBe(100);
    expect(regenOil(0, 100, false)).toBe(100);
    expect(regenOil(-10, 0, false)).toBe(0);
    expect(regenOil(40, 1, true)).toBe(40);
    expect(regenOil(40, 1, false)).toBe(45);
    expect(regenOil(98, 1, false)).toBe(100);
  });
});

describe("gatewick phase", () => {
  it("switches at HP <= 6 and stops taking flare damage", () => {
    expect(gatewickPhase(12)).toBe(1);
    expect(gatewickPhase(6.01)).toBe(1);
    expect(gatewickPhase(6)).toBe(2);
    expect(gatewickPhase(0)).toBe(2);
    expect(flareEffect("gatewick", 7)?.damage).toBe(1);
    expect(flareEffect("gatewick", 6)).toBeNull();
    expect(flareEffect("wisp", 3)).toEqual({ damage: 1, stun: 1.2 });
    expect(flareEffect("gorse", 2)).toEqual({ damage: 1, stun: 0 });
  });
});

describe("telegraphs", () => {
  it("meets the minimum wind-up for assists on and off", () => {
    for (const kind of ["gorse", "wisp", "gatewickSweep", "gatewickSlam"] as const) {
      expect(telegraphDurationMs(kind, false)).toBeGreaterThanOrEqual(350);
      expect(telegraphDurationMs(kind, true)).toBeGreaterThanOrEqual(500);
    }
    expect(telegraphDurationMs("gorse", false)).toBe(400);
    expect(telegraphDurationMs("gorse", true)).toBe(550);
    expect(telegraphDurationMs("wisp", true)).toBe(600);
    expect(telegraphDurationMs("gatewickSweep", true)).toBe(650);
    expect(telegraphDurationMs("gatewickSlam", true)).toBe(700);
  });
});
