import { describe, expect, it } from "vitest";
import { DEFAULT_ASSISTS } from "../src/content/assists";
import { demoPolicy } from "../src/app/demoPolicy";
import { MistRoad } from "../src/world/MistRoadLevel";

describe("scripted playthrough", () => {
  it("clears Mist Road through Gatewick without dying", () => {
    const w = new MistRoad(DEFAULT_ASSISTS);
    const dt = 1 / 60;
    let guard = 0;
    let stuck = 0;
    let last = 0;
    while (w.outcome === "play" && w.time < 150 && guard < 150 * 60) {
      w.step(dt, demoPolicy(w));
      guard += 1;
      const near = w.nearestThreat(6);
      if (!near && Math.abs(w.player.z - last) < 0.002) stuck += dt;
      else stuck = 0;
      last = w.player.z;
      if (stuck > 8) break;
    }
    if (w.outcome !== "clear") {
      const foes = w.enemies.map((e) => ({
        id: e.id, kind: e.kind, hp: e.hp, alive: e.alive, x: +e.x.toFixed(2), z: +e.z.toFixed(2), state: e.state,
      }));
      throw new Error(JSON.stringify({
        outcome: w.outcome,
        time: +w.time.toFixed(2),
        hp: w.player.hp,
        oil: +w.player.oil.toFixed(1),
        pos: [+w.player.x.toFixed(2), +w.player.z.toFixed(2)],
        hits: w.hitsTaken,
        checkpoint: w.checkpoint,
        visited: [w.visitedTrail, w.visitedGate],
        bossFight: w.bossFight,
        stuck,
        foes,
      }, null, 2));
    }
    expect(w.player.alive).toBe(true);
    expect(w.checkpoint).toBe("cleared");
    expect(w.visitedTrail).toBe(true);
    expect(w.visitedGate).toBe(true);
    expect(w.enemies.filter((e) => e.kind === "gorse" && !e.summon && e.alive)).toHaveLength(0);
    expect(w.enemies.filter((e) => e.kind === "wisp" && e.alive)).toHaveLength(0);
    expect(w.time).toBeLessThan(150);
    expect(w.time).toBeGreaterThan(8);
  });
});
