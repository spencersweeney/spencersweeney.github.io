import { effectiveAssists, type AssistSettings, type EffectiveAssists } from "../content/assists";
import { STR } from "../content/strings";
import { damageEnemy, gatewickPhase, hurtCenterY, hurtRadius, makeEnemy, stunEnemy } from "../enemies/EnemyBase";
import { stepGatewick } from "../enemies/Gatewick";
import { stepGorse } from "../enemies/GorseSprite";
import { stepWisp } from "../enemies/DraftWisp";
import {
  ATTACK_RADIUS,
  ATTACK_REACH,
  DODGE_BURST,
  DODGE_SPEED,
  HITSTOP,
  WALK_SPEED,
  startAttack,
  startDodge,
  stepAttack,
  stepDodge,
  tryHurtPlayer,
} from "../player/Combat";
import { FLARE_ACTIVE, FLARE_ANGLE, FLARE_RANGE, flareEffect, regenOil, trySpendOil } from "../player/LampFlare";
import { applyGravity, probeGround, resolvePosition } from "../player/PlayerController";
import { capsuleHitsSphere, inCircle, inCone } from "../util/hitbox";
import { clamp, dampAngle, wrapAngle } from "../util/math";
import {
  ARENA,
  ENEMY_SPAWNS,
  GATE_SHRINE,
  TRAIL_SHRINE,
  checkpointPose,
  checkpointRank,
} from "./checkpoints";
import {
  IDLE_INPUT,
  type CheckpointId,
  type EnemyState,
  type FrameInput,
  type Outcome,
  type PlayerState,
} from "./types";

const PITCH_MIN = (-10 * Math.PI) / 180;
const PITCH_MAX = (55 * Math.PI) / 180;
const MAX_HP = 3;

function freshPlayer(x: number, z: number): PlayerState {
  return {
    x,
    y: 0,
    z,
    yaw: 0,
    vy: 0,
    hp: MAX_HP,
    oil: 100,
    grounded: true,
    attack: { phase: "idle", t: 0, hitIds: [] },
    dodging: false,
    dodgeT: 0,
    dodgeDx: 0,
    dodgeDz: 1,
    dodgeCd: 0,
    iframes: 0,
    hurtT: 0,
    kbx: 0,
    kbz: 0,
    kbT: 0,
    flaring: false,
    flareT: 0,
    flareHitIds: [],
    alive: true,
    moving: false,
  };
}

export class MistRoad {
  player: PlayerState;
  enemies: EnemyState[];
  assists: EffectiveAssists;
  checkpoint: CheckpointId = "spawn";
  cameraYaw = 0;
  cameraPitch = 0.22;
  lookIdle = 0;
  lockId: string | null = null;
  outcome: Outcome = "play";
  time = 0;
  hitstop = 0;
  prompt = "";
  promptT = 0;
  bossFight = false;
  bossIntro = false;
  visitedTrail = false;
  visitedGate = false;
  hitsTaken = 0;
  debugFreezeAI = false;
  private shown = { gorse: false, shrine: false, wisp: false, gate: false };
  private summonN = 0;

  constructor(settings: AssistSettings) {
    this.assists = effectiveAssists(settings);
    this.player = freshPlayer(0, 0);
    this.enemies = ENEMY_SPAWNS.map((s) => makeEnemy(s.id, s.kind, s.x, s.z));
  }

  setAssists(settings: AssistSettings): void {
    this.assists = effectiveAssists(settings);
  }

  reset(): void {
    this.checkpoint = "spawn";
    this.player = freshPlayer(0, 0);
    this.enemies = ENEMY_SPAWNS.map((s) => makeEnemy(s.id, s.kind, s.x, s.z));
    this.cameraYaw = 0;
    this.cameraPitch = 0.22;
    this.lookIdle = 0;
    this.lockId = null;
    this.outcome = "play";
    this.time = 0;
    this.hitstop = 0;
    this.prompt = "";
    this.promptT = 0;
    this.bossFight = false;
    this.bossIntro = false;
    this.visitedTrail = false;
    this.visitedGate = false;
    this.hitsTaken = 0;
    this.shown = { gorse: false, shrine: false, wisp: false, gate: false };
    this.summonN = 0;
  }

  /** Fresh session placed at a saved checkpoint. Earlier enemies are alive again. */
  loadCheckpoint(id: CheckpointId): void {
    this.reset();
    if (id === "spawn") return;
    this.checkpoint = id;
    const pose = checkpointPose(id);
    this.player.x = pose.x;
    this.player.z = pose.z;
    this.player.yaw = 0;
    if (checkpointRank(id) >= checkpointRank("trail_shrine")) this.visitedTrail = true;
    if (checkpointRank(id) >= checkpointRank("gate_threshold")) this.visitedGate = true;
    if (id === "cleared") this.outcome = "clear";
  }

  respawn(): void {
    const pose = checkpointPose(this.checkpoint === "cleared" ? "gate_threshold" : this.checkpoint);
    this.player = freshPlayer(pose.x, pose.z);
    this.outcome = "play";
    this.hitstop = 0;
    this.bossFight = false;
    this.lockId = null;
    this.prompt = "";
    this.promptT = 0;
    const gate = pose.z - 0.4;
    this.enemies = this.enemies.filter((e) => !e.summon);
    for (const e of this.enemies) {
      const revive = e.kind === "gatewick" || e.homeZ >= gate;
      if (!revive) continue;
      const restored = makeEnemy(e.id, e.kind, e.homeX, e.homeZ, false);
      Object.assign(e, restored);
    }
  }

  tryHurt(amount: number, srcX: number, srcZ: number): boolean {
    const landed = tryHurtPlayer(this.player, amount, srcX, srcZ, this.assists.damageTakenMult);
    if (landed) this.hitsTaken += 1;
    return landed;
  }

  shapeThreatens(e: EnemyState, x: number, z: number): boolean {
    if (!e.alive || e.telegraphShape === "none") return false;
    if (e.telegraphShape === "circle") return inCircle(x, z, e.markX, e.markZ, e.telegraphR);
    return inCone(e.x, e.z, e.aimX, e.aimZ, x, z, e.telegraphLen, e.telegraphCone);
  }

  nearestThreat(radius: number): EnemyState | null {
    let best: EnemyState | null = null;
    let bestD = Infinity;
    for (const e of this.enemies) {
      if (!e.alive) continue;
      const d = Math.hypot(e.x - this.player.x, e.z - this.player.z);
      const limit = e.kind === "gatewick" ? (this.bossFight ? 16 : 0) : radius;
      if (d <= limit && d < bestD) {
        best = e;
        bestD = d;
      }
    }
    return best;
  }

  nextShrine(): { x: number; z: number } | null {
    if (!this.visitedTrail) return { x: TRAIL_SHRINE.x, z: TRAIL_SHRINE.z };
    if (!this.visitedGate) return { x: GATE_SHRINE.x, z: GATE_SHRINE.z };
    return null;
  }

  step(dt: number, input: FrameInput = IDLE_INPUT): void {
    this.stepDt = dt;
    if (this.outcome !== "play") return;
    if (this.hitstop > 0) {
      this.hitstop = Math.max(0, this.hitstop - dt);
      return;
    }
    this.time += dt;
    const p = this.player;
    if (p.hurtT > 0) p.hurtT = Math.max(0, p.hurtT - dt);

    this.applyLook(dt, input);
    this.applyActions(input);
    this.applyMotion(dt, input);
    this.applySoftLock();

    const connected = this.applySwing(dt);
    const flared = this.applyFlare(dt, input);
    if ((connected || flared) && this.hitstop <= 0) this.hitstop = HITSTOP;

    if (this.bossDead()) {
      this.outcome = "clear";
      this.checkpoint = "cleared";
      this.say(STR.bossClear, 6);
      return;
    }

    if (!this.debugFreezeAI) this.stepEnemies(input.slow && this.assists.slowCombat ? dt * 0.75 : dt);

    if (!p.alive) {
      this.outcome = "dead";
      return;
    }
    this.refreshPrompts();
  }

  private applyLook(dt: number, input: FrameInput): void {
    if (input.aimYaw !== undefined && Number.isFinite(input.aimYaw)) {
      this.cameraYaw = input.aimYaw;
      this.player.yaw = input.aimYaw;
      this.lookIdle = 0;
      return;
    }
    this.cameraYaw -= input.lookX;
    this.cameraPitch = clamp(this.cameraPitch + input.lookY, PITCH_MIN, PITCH_MAX);
    const looking = Math.abs(input.lookX) + Math.abs(input.lookY) > 1e-5;
    if (looking) this.lookIdle = 0;
    else this.lookIdle += dt;

    if (input.lockOn) {
      if (this.lockId) this.lockId = null;
      else {
        const t = this.nearestThreat(14);
        this.lockId = t ? t.id : null;
      }
    }
    const locked = this.enemies.find((e) => e.id === this.lockId && e.alive);
    if (this.lockId && (!locked || Math.hypot(locked.x - this.player.x, locked.z - this.player.z) > 14)) {
      this.lockId = null;
    }
    if (locked) {
      const desired = Math.atan2(locked.x - this.player.x, locked.z - this.player.z);
      this.cameraYaw = dampAngle(this.cameraYaw, desired, 10, dt);
      this.lookIdle = 0;
      return;
    }
    if (this.assists.cameraRecenter && this.lookIdle > 1.2 && this.player.moving) {
      this.cameraYaw = dampAngle(this.cameraYaw, this.player.yaw, 4, dt);
    }
  }

  private applyActions(input: FrameInput): void {
    const p = this.player;
    const wish = this.wishDir(input);
    if (input.dodge) {
      const dirX = wish.moving ? wish.x : Math.sin(p.yaw);
      const dirZ = wish.moving ? wish.z : Math.cos(p.yaw);
      startDodge(p, dirX, dirZ, this.assists.dodgeIframesMs / 1000);
    }
    if (input.attack && !p.dodging) startAttack(p.attack);
    if (input.interact) this.interact();
    if (input.flare && !p.flaring) {
      const next = trySpendOil(p.oil);
      if (next !== null) {
        p.oil = next;
        p.flaring = true;
        p.flareT = 0;
        p.flareHitIds = [];
      }
    }
  }

  private wishDir(input: FrameInput): { x: number; z: number; moving: boolean } {
    let mx = input.moveX;
    let my = input.moveY;
    const mag = Math.hypot(mx, my);
    if (mag > 1) {
      mx /= mag;
      my /= mag;
    }
    const yaw = input.moveYaw !== undefined ? input.moveYaw : this.cameraYaw;
    const fx = Math.sin(yaw);
    const fz = Math.cos(yaw);
    const rx = Math.cos(yaw);
    const rz = -Math.sin(yaw);
    const x = rx * mx + fx * my;
    const z = rz * mx + fz * my;
    return { x, z, moving: mag > 0.12 };
  }

  private applyMotion(dt: number, input: FrameInput): void {
    const p = this.player;
    stepDodge(p, dt);
    const wish = this.wishDir(input);
    let vx = 0;
    let vz = 0;
    if (p.dodging && p.dodgeT <= DODGE_BURST) {
      vx = p.dodgeDx * DODGE_SPEED;
      vz = p.dodgeDz * DODGE_SPEED;
      p.moving = true;
    } else if (wish.moving && !p.dodging) {
      vx = wish.x * WALK_SPEED;
      vz = wish.z * WALK_SPEED;
      p.moving = true;
      p.yaw = dampAngle(p.yaw, Math.atan2(wish.x, wish.z), 14, dt);
    } else {
      p.moving = false;
      if (input.moveYaw !== undefined && !p.dodging) p.yaw = input.moveYaw;
    }
    if (p.kbT > 0) {
      vx += p.kbx;
      vz += p.kbz;
      p.kbT = Math.max(0, p.kbT - dt);
    }
    p.x += vx * dt;
    p.z += vz * dt;
    const placed = resolvePosition(p.x, p.z, 0.35, this.bossFight && !this.bossDead());
    p.x = placed.x;
    p.z = placed.z;
    const grav = applyGravity(p.y, p.vy, dt);
    const ground = probeGround(grav.y, grav.vy, p.x, p.z);
    p.y = ground.y;
    p.vy = ground.vy;
    p.grounded = ground.grounded;
  }

  private applySoftLock(): void {
    const p = this.player;
    if (!this.assists.softLock) return;
    if (p.attack.phase !== "windup" && p.attack.phase !== "active") return;
    const t = this.nearestThreat(3.6);
    if (!t) return;
    const desired = Math.atan2(t.x - p.x, t.z - p.z);
    const delta = wrapAngle(desired - p.yaw);
    if (Math.abs(delta) < 0.75) p.yaw += delta * 0.55;
  }

  private stepDt = 1 / 60;

  private applySwing(dt: number): boolean {
    const p = this.player;
    const fx = Math.sin(p.yaw);
    const fz = Math.cos(p.yaw);
    const ax = p.x + fx * 0.35;
    const az = p.z + fz * 0.35;
    const bx = ax + fx * ATTACK_REACH;
    const bz = az + fz * ATTACK_REACH;
    const targets: { id: string; hit: () => void }[] = [];
    for (const e of this.enemies) {
      if (!e.alive) continue;
      const hit = capsuleHitsSphere(
        ax, 0.95, az,
        bx, 0.95, bz,
        ATTACK_RADIUS,
        e.x, hurtCenterY(e.kind), e.z,
        hurtRadius(e.kind),
      );
      if (!hit) continue;
      targets.push({
        id: e.id,
        hit: () => damageEnemy(e, 1),
      });
    }
    return stepAttack(p.attack, dt, targets);
  }

  private applyFlare(dt: number, _input: FrameInput): boolean {
    const p = this.player;
    if (!p.flaring) {
      p.oil = regenOil(p.oil, dt, false);
      return false;
    }
    p.flareT += dt;
    const fx = Math.sin(p.yaw);
    const fz = Math.cos(p.yaw);
    let connected = false;
    for (const e of this.enemies) {
      if (!e.alive || p.flareHitIds.includes(e.id)) continue;
      if (!inCone(p.x, p.z, fx, fz, e.x, e.z, FLARE_RANGE, FLARE_ANGLE)) continue;
      const effect = flareEffect(e.kind, e.hp);
      p.flareHitIds.push(e.id);
      if (!effect) continue;
      damageEnemy(e, effect.damage);
      if (effect.stun > 0) stunEnemy(e, effect.stun);
      connected = true;
    }
    if (p.flareT >= FLARE_ACTIVE) p.flaring = false;
    return connected;
  }

  private stepEnemies(dt: number): void {
    const ctx = {
      dt,
      px: this.player.x,
      pz: this.player.z,
      bonusMs: this.assists.telegraphBonusMs,
      hurtPlayer: (amount: number, srcX: number, srcZ: number) => this.tryHurt(amount, srcX, srcZ),
    };
    for (const e of this.enemies) {
      if (!e.alive) continue;
      if (e.kind === "gorse") stepGorse(e, ctx);
      else if (e.kind === "wisp") stepWisp(e, ctx);
      else stepGatewick(e, ctx, this.bossFight);
      if (e.pendingSummon) {
        e.pendingSummon = false;
        this.spawnSummon(e);
      }
      const locked = e.kind === "gatewick" || e.summon;
      const placed = resolvePosition(e.x, e.z, 0.3, locked && this.bossFight);
      e.x = placed.x;
      e.z = placed.z;
    }
    this.separate();
  }

  private spawnSummon(boss: EnemyState): void {
    if (this.enemies.some((e) => e.summon && e.alive)) return;
    if (gatewickPhase(boss.hp) === 2) return;
    this.summonN += 1;
    const s = makeEnemy(`summon${this.summonN}`, "gorse", boss.x + 1.4, boss.z - 1.2, true);
    s.homeX = s.x;
    s.homeZ = s.z;
    this.enemies.push(s);
  }

  private separate(): void {
    const list = this.enemies.filter((e) => e.alive);
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i];
        const b = list[j];
        const dx = b.x - a.x;
        const dz = b.z - a.z;
        const d = Math.hypot(dx, dz);
        const min = a.kind === "gatewick" || b.kind === "gatewick" ? 1.6 : 0.85;
        if (d >= min || d < 1e-4) continue;
        const push = (min - d) * 0.5;
        const nx = dx / d;
        const nz = dz / d;
        if (a.kind !== "gatewick") {
          a.x -= nx * push;
          a.z -= nz * push;
        }
        if (b.kind !== "gatewick") {
          b.x += nx * push;
          b.z += nz * push;
        }
      }
    }
  }

  private bossDead(): boolean {
    const boss = this.enemies.find((e) => e.kind === "gatewick");
    return !boss || !boss.alive;
  }

  private interact(): void {
    const p = this.player;
    if (Math.hypot(p.x - TRAIL_SHRINE.x, p.z - TRAIL_SHRINE.z) <= 1.5) this.rest("trail_shrine");
    if (Math.hypot(p.x - GATE_SHRINE.x, p.z - GATE_SHRINE.z) <= 1.5) this.rest("gate_threshold");
  }

  private rest(id: "trail_shrine" | "gate_threshold"): void {
    this.player.hp = MAX_HP;
    if (id === "trail_shrine") this.visitedTrail = true;
    if (id === "gate_threshold") {
      this.visitedTrail = true;
      this.visitedGate = true;
    }
    if (checkpointRank(id) > checkpointRank(this.checkpoint)) this.checkpoint = id;
    this.say(STR.promptShrine, 3.2);
  }

  private refreshPrompts(): void {
    if (this.promptT > 0) this.promptT = Math.max(0, this.promptT - this.stepDt);
    const p = this.player;
    if (!this.bossFight && !this.bossDead() && p.z > 50.5 && Math.hypot(p.x - ARENA.x, p.z - ARENA.z) < 7.2) {
      this.bossFight = true;
      this.bossIntro = true;
      this.say(STR.bossIntro, 4.5);
    }
    if (!this.assists.showPrompts) return;
    if (!this.shown.gorse && p.z > 3) {
      this.shown.gorse = true;
      this.say(STR.promptGorse, 4.5);
    }
    if (!this.shown.shrine && Math.hypot(p.x - TRAIL_SHRINE.x, p.z - TRAIL_SHRINE.z) < 3.2) {
      this.shown.shrine = true;
      this.say(STR.promptShrine, 4.2);
    }
    if (!this.shown.wisp && this.enemies.some((e) => e.kind === "wisp" && e.alive && Math.hypot(e.x - p.x, e.z - p.z) < 8)) {
      this.shown.wisp = true;
      this.say(STR.promptWisp, 4.2);
    }
    if (!this.shown.gate && Math.hypot(p.x - GATE_SHRINE.x, p.z - GATE_SHRINE.z) < 6 && p.z > 40) {
      this.shown.gate = true;
      this.say(STR.promptGate, 4.5);
    }
  }

  private say(text: string, seconds: number): void {
    this.prompt = text;
    this.promptT = seconds;
  }
}
