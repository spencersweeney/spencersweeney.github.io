import { shipItems, type CareerItem } from "../content/career";
import { clamp, dampAngle, wrapAngle } from "../util/math";
import {
  BRAZIERS,
  CRITTERS,
  GATEWICK_ORDER,
  HEAD,
  LIFT,
  SPRITE_HOMES,
  STONES,
  THICKET,
  THICKET_ENTRANCE,
  WHEEL,
  WISPS,
  buildRects,
  type Marker,
  type Rect,
} from "./level";

export const WALK = 3.2;
export const RUN = 5.5;
export const ACCEL = 18;
export const DECEL = 22;
export const GRAVITY = 9.6;
export const JUMP_VY = 4.6;
export const GLIDE_VY = -1.2;
export const GLIDE_SPEED = 5;
export const GLIDE_TURN = (120 * Math.PI) / 180;
export const UPDRAFT_VY = 4;
export const UPDRAFT_R = 2.5;
export const UPDRAFT_H = 12;
export const LAMP_MAX = 100;
export const LAMP_DRAIN = 4;
export const FLARE_COST = 10;
export const FLARE_CD = 1.5;
export const REVEAL_R = 6;
export const FLARE_R = 8;
export const REFILL_R = 3;
export const REFILL_RATE = 40;
export const STONE_LINGER = 6;
export const MANTLE_MIN = 0.6;
export const MANTLE_MAX = 1.8;
export const MANTLE_TIME = 0.45;

export interface Assists {
  endlessLamp: boolean;
  stonesStay: boolean;
  autoMantle: boolean;
  gentleThicket: boolean;
  landmarkNudge: boolean;
  hintPulses: boolean;
}

export const DEFAULT_ASSISTS: Assists = {
  endlessLamp: true,
  stonesStay: true,
  autoMantle: true,
  gentleThicket: true,
  landmarkNudge: true,
  hintPulses: true,
};

export interface PlayInput {
  moveX: number;
  moveY: number;
  lookX: number;
  lookY: number;
  jump: boolean;
  lamp: boolean;
  flare: boolean;
  interact: boolean;
  run: boolean;
  dismiss: boolean;
  moveYaw?: number;
}

export const IDLE: PlayInput = {
  moveX: 0, moveY: 0, lookX: 0, lookY: 0, jump: false, lamp: false, flare: false, interact: false, run: false, dismiss: false,
};

export interface Sprite {
  id: string;
  x: number;
  z: number;
  homeX: number;
  homeZ: number;
  state: "idle" | "windup" | "charge";
  wind: number;
  vx: number;
  vz: number;
  dispelled: boolean;
  enabled: boolean;
}

export class Valley {
  readonly assists: Assists;
  readonly dev: boolean;
  readonly items: CareerItem[];
  readonly rects = buildRects();
  player = {
    x: 0, y: 0, z: 1.2, vx: 0, vy: 0, vz: 0, yaw: 0,
    grounded: true, coyote: 0, jumpBuffer: 0, gliding: false,
    mantle: 0, mx: 0, my: 0, mz: 0, tx: 0, ty: 0, tz: 0,
    lastGroundY: 0, invuln: 0,
  };
  cameraYaw = 0;
  cameraPitch = 0.22;
  lamp = LAMP_MAX;
  lampRaised = false;
  flareCd = 0;
  flareAge = 99;
  stones = STONES.map(() => ({ solid: false, linger: 0, ever: false }));
  lit = new Set<string>();
  bridge = false;
  liftDone = false;
  wheelT = 0;
  liftT = 0;
  sprites: Sprite[] = SPRITE_HOMES.map((home, i) => ({
    id: home.id, x: home.x, z: home.z, homeX: home.x, homeZ: home.z,
    state: "idle" as const, wind: 0, vx: 0, vz: 0, dispelled: false, enabled: i < 3,
  }));
  critters = CRITTERS.map((c) => ({ ...c, hx: c.x, hz: c.z }));
  wisps = WISPS.map((w) => ({ ...w, y: 1.4, awake: false, arrived: false }));
  found = new Set<string>();
  card: CareerItem | null = null;
  thicketPips = 3;
  inThicket = false;
  scatter = 0;
  thicketCleared = false;
  orderStep = 0;
  wrongs = 0;
  updrafts = false;
  rekindle = 0;
  woken = false;
  archiveOpen = false;
  sequence = 0;
  showOrder = false;
  endCard = false;
  climbing = false;
  time = 0;
  idle = 0;
  fade = 0;
  prompt = "";
  toast = "";
  toastT = 0;
  gateYaw = 0;
  private prevJump = false;
  private fallFrom = 0;

  constructor(opts?: { dev?: boolean; assists?: Partial<Assists>; items?: CareerItem[] }) {
    this.dev = opts?.dev ?? Boolean(import.meta.env?.DEV);
    this.assists = { ...DEFAULT_ASSISTS, ...opts?.assists };
    this.items = opts?.items ?? shipItems(this.dev);
    this.sprites.forEach((sprite, i) => {
      sprite.enabled = this.assists.gentleThicket ? i < 2 : i < 3;
    });
  }

  get discoveriesFound(): number {
    return this.items.filter((item) => this.found.has(item.id)).length;
  }

  get discoveryTotal(): number {
    return this.items.length;
  }

  step(dt: number, input: PlayInput): void {
    this.time += dt;
    this.prompt = "";
    this.toastT = Math.max(0, this.toastT - dt);
    this.flareCd = Math.max(0, this.flareCd - dt);
    this.flareAge += dt;
    this.player.invuln = Math.max(0, this.player.invuln - dt);
    if (this.card) {
      if (input.dismiss) this.card = null;
      this.prompt = "";
      return;
    }
    if (this.endCard) {
      if (input.dismiss) this.endCard = false;
      return;
    }
    if (this.scatter > 0) {
      this.scatter = Math.max(0, this.scatter - dt);
      if (this.scatter === 0) this.respawnThicket();
      return;
    }
    if (this.fade > 0) {
      this.fade = Math.max(0, this.fade - dt);
      if (this.fade === 0) this.respawnBrazier();
      return;
    }
    this.applyLook(dt, input);
    this.applyLamp(dt, input);
    this.applyMotion(dt, input);
    this.applyWorld(dt, input);
    this.prompts();
  }

  private applyLook(dt: number, input: PlayInput): void {
    const moving = Math.hypot(input.moveX, input.moveY) > 0.12;
    this.idle = moving ? 0 : this.idle + dt;
    if (input.moveYaw !== undefined) this.cameraYaw = input.moveYaw;
    else {
      this.cameraYaw = wrapAngle(this.cameraYaw - input.lookX);
      this.cameraPitch = clamp(this.cameraPitch - input.lookY, -0.2, 0.9);
    }
    if (this.assists.landmarkNudge && this.idle > 3 && !moving) {
      const next = this.nextLandmark();
      if (next) this.cameraYaw = dampAngle(this.cameraYaw, Math.atan2(next.x - this.player.x, next.z - this.player.z), 1.5, dt);
    }
  }

  private applyLamp(dt: number, input: PlayInput): void {
    const canRaise = this.assists.endlessLamp || this.lamp > 0;
    this.lampRaised = input.lamp && canRaise;
    if (this.lampRaised && !this.assists.endlessLamp) this.lamp = Math.max(0, this.lamp - LAMP_DRAIN * dt);
    if (this.lamp <= 0) this.lampRaised = false;
    if (input.flare && this.flareCd <= 0 && (this.assists.endlessLamp || this.lamp >= FLARE_COST)) {
      if (!this.assists.endlessLamp) this.lamp = Math.max(0, this.lamp - FLARE_COST);
      this.flareCd = FLARE_CD;
      this.flareAge = 0;
      this.flarePulse();
    }
    for (const brazier of BRAZIERS) {
      if (this.lit.has(brazier.id)) continue;
      const dist = this.dist(brazier.x, brazier.z);
      if (this.lampRaised && dist < 1.6 && Math.abs(this.player.y - brazier.y) < 2) this.light(brazier.id);
    }
    if (this.nearLitBrazier()) this.lamp = Math.min(LAMP_MAX, this.lamp + REFILL_RATE * dt);
    this.revealStones(dt);
  }

  private flarePulse(): void {
    for (const brazier of BRAZIERS) {
      if (this.dist(brazier.x, brazier.z) <= FLARE_R) this.light(brazier.id);
    }
    for (const wisp of this.wisps) {
      if (Math.hypot(wisp.x - this.player.x, wisp.z - this.player.z) <= FLARE_R) wisp.awake = true;
    }
    for (const critter of this.critters) {
      const dx = critter.x - this.player.x;
      const dz = critter.z - this.player.z;
      const d = Math.hypot(dx, dz) || 1;
      if (d < FLARE_R) {
        critter.x += (dx / d) * 2.2;
        critter.z += (dz / d) * 2.2;
      }
    }
    for (const sprite of this.sprites) {
      if (!sprite.enabled || sprite.dispelled) continue;
      if (Math.hypot(sprite.x - this.player.x, sprite.z - this.player.z) <= 4) sprite.dispelled = true;
    }
  }

  private revealStones(dt: number): void {
    this.stones.forEach((stone, i) => {
      const spot = STONES[i]!;
      const lit = this.lampRaised && Math.hypot(spot.x - this.player.x, spot.z - this.player.z) <= REVEAL_R;
      if (lit) {
        stone.solid = true;
        stone.ever = true;
        stone.linger = this.assists.stonesStay ? 1e9 : STONE_LINGER;
      } else if (stone.solid && !this.assists.stonesStay) {
        stone.linger -= dt;
        if (stone.linger <= 0) stone.solid = false;
      } else if (stone.ever && this.assists.stonesStay) stone.solid = true;
    });
  }

  private applyMotion(dt: number, input: PlayInput): void {
    const p = this.player;
    if (p.mantle > 0) {
      p.mantle = Math.max(0, p.mantle - dt);
      const t = 1 - p.mantle / MANTLE_TIME;
      p.x = p.mx + (p.tx - p.mx) * t;
      p.y = p.my + (p.ty - p.my) * t;
      p.z = p.mz + (p.tz - p.mz) * t;
      p.vy = 0;
      p.grounded = p.mantle === 0;
      if (p.grounded) p.lastGroundY = p.y;
      return;
    }
    const yaw = input.moveYaw !== undefined ? input.moveYaw : this.cameraYaw;
    let mx = input.moveX;
    let my = input.moveY;
    const mag = Math.hypot(mx, my);
    if (mag > 1) { mx /= mag; my /= mag; }
    const fx = Math.sin(yaw);
    const fz = Math.cos(yaw);
    const wishX = Math.cos(yaw) * mx + fx * my;
    const wishZ = -Math.sin(yaw) * mx + fz * my;
    const moving = mag > 0.12;
    const speed = input.run || mag > 0.8 ? RUN : WALK;
    const targetX = moving ? wishX * speed : 0;
    const targetZ = moving ? wishZ * speed : 0;
    if (moving) p.yaw = dampAngle(p.yaw, Math.atan2(wishX, wishZ), 10, dt);
    const jumpEdge = input.jump && !this.prevJump;
    this.prevJump = input.jump;
    if (jumpEdge) p.jumpBuffer = 0.12;
    else p.jumpBuffer = Math.max(0, p.jumpBuffer - dt);

    const support = this.supportAt(p.x, p.z, p.y);
    const wasGround = p.grounded;
    if (support && p.vy <= 0.2 && p.y <= support.y + 0.45 && p.y >= support.y - 0.08) {
      p.y = support.y;
      p.vy = 0;
      p.grounded = true;
      p.gliding = false;
      p.lastGroundY = p.y;
      p.coyote = 0.12;
    } else {
      p.grounded = false;
      if (wasGround) p.coyote = 0.12;
      else p.coyote = Math.max(0, p.coyote - dt);
    }
    if (p.grounded && moving) this.tryStep(wishX, wishZ);
    if ((p.grounded || p.coyote > 0) && p.jumpBuffer > 0) {
      p.vy = JUMP_VY;
      p.y += 0.02;
      p.grounded = false;
      p.jumpBuffer = 0;
      p.coyote = 0;
      p.gliding = false;
    }
    const wantGlide = input.jump && !p.grounded && p.vy < 0 && p.mantle <= 0;
    p.gliding = wantGlide;
    if (p.gliding) {
      p.vy = p.vy < GLIDE_VY ? damp(p.vy, GLIDE_VY, 6, dt) : Math.max(GLIDE_VY, p.vy);
      const face = moving ? Math.atan2(wishX, wishZ) : p.yaw;
      p.yaw = moveYawLimited(p.yaw, face, GLIDE_TURN * dt);
      p.vx = Math.sin(p.yaw) * GLIDE_SPEED;
      p.vz = Math.cos(p.yaw) * GLIDE_SPEED;
      this.applyUpdraft(dt);
    } else {
      const rate = moving ? ACCEL : DECEL;
      p.vx = approach(p.vx, targetX, rate * dt);
      p.vz = approach(p.vz, targetZ, rate * dt);
      if (!p.grounded) p.vy -= GRAVITY * dt;
    }
    const prevY = p.y;
    p.x += p.vx * dt;
    p.z += p.vz * dt;
    p.y += p.vy * dt;
    const landed = this.supportAt(p.x, p.z, p.y);
    if (landed && p.vy <= 0 && prevY >= landed.y - 0.05 && p.y <= landed.y + 0.5) {
      p.y = landed.y;
      p.vy = 0;
      p.grounded = true;
      p.gliding = false;
      p.lastGroundY = p.y;
    }
    if (!p.grounded && (p.y < this.fallFrom - 25 || p.y < -8)) {
      this.fade = 0.6;
      this.toast = "You wake by the last warm fire.";
      this.toastT = 3;
    } else if (p.grounded) this.fallFrom = p.y;
    if (this.assists.autoMantle || input.jump) this.tryMantle(wishX, wishZ, moving || input.jump);
  }

  private tryStep(wishX: number, wishZ: number): void {
    const ahead = this.supportAt(this.player.x + wishX * 0.45, this.player.z + wishZ * 0.45, this.player.y + 0.6);
    if (!ahead) return;
    const rise = ahead.y - this.player.y;
    if (rise > 0.12 && rise < MANTLE_MIN) this.player.y = ahead.y;
  }

  private tryMantle(wishX: number, wishZ: number, toward: boolean): void {
    if (!toward || this.player.mantle > 0 || this.player.gliding) return;
    const ahead = this.supportAt(this.player.x + wishX * 0.7, this.player.z + wishZ * 0.7, this.player.y + MANTLE_MAX);
    if (!ahead) return;
    const rise = ahead.y - this.player.y;
    if (rise < MANTLE_MIN || rise > MANTLE_MAX) return;
    if (Math.hypot(wishX, wishZ) < 0.2 && !this.assists.autoMantle) return;
    this.player.mx = this.player.x;
    this.player.my = this.player.y;
    this.player.mz = this.player.z;
    this.player.tx = this.player.x + wishX * 0.8;
    this.player.ty = ahead.y;
    this.player.tz = this.player.z + wishZ * 0.8;
    this.player.mantle = MANTLE_TIME;
    this.player.grounded = false;
    this.climbing = true;
  }

  private applyUpdraft(dt: number): void {
    const vents = BRAZIERS.filter((b) => (b.vent && this.lit.has(b.id)) || (this.updrafts && b.terrace));
    for (const vent of vents) {
      const dx = this.player.x - vent.x;
      const dz = this.player.z - vent.z;
      if (dx * dx + dz * dz > UPDRAFT_R * UPDRAFT_R) continue;
      const top = vent.y + UPDRAFT_H;
      if (this.player.y >= top) continue;
      this.player.vy = UPDRAFT_VY;
      if (this.player.y + this.player.vy * dt > top) {
        this.player.y = top;
        this.player.vy = 0;
      }
      this.prompt = "Ride the warm air";
      return;
    }
  }

  private applyWorld(dt: number, input: PlayInput): void {
    this.inThicket = insideThicket(this.player.x, this.player.y, this.player.z);
    if (!this.inThicket) this.thicketPips = 3;
    this.stepSprites(dt);
    this.stepCritters(dt);
    this.stepWisps(dt);
    this.stepMechanisms(dt);
    if (input.interact) this.interact();
    if (this.updrafts && this.dist(HEAD.x, HEAD.z) < 3.2 && this.player.y > 48 && input.lamp) {
      this.rekindle += dt;
      this.prompt = "Rekindle the wick (hold lamp)";
      if (this.rekindle >= 3) this.wake();
    } else this.rekindle = Math.max(0, this.rekindle - dt);
    if (this.sequence > 0) {
      this.sequence = Math.max(0, this.sequence - dt);
      if (input.dismiss) this.sequence = 0;
    }
  }

  private stepSprites(dt: number): void {
    for (const sprite of this.sprites) {
      if (!sprite.enabled || sprite.dispelled) continue;
      const dx = this.player.x - sprite.x;
      const dz = this.player.z - sprite.z;
      const dist = Math.hypot(dx, dz) || 1;
      if (sprite.state === "idle") {
        sprite.x = sprite.homeX + Math.sin(this.time + sprite.homeZ) * 0.8;
        sprite.z = sprite.homeZ + Math.cos(this.time * 0.7) * 0.8;
        if (this.inThicket && dist < 5) {
          sprite.state = "windup";
          sprite.wind = 0.6;
        }
      } else if (sprite.state === "windup") {
        sprite.wind -= dt;
        if (sprite.wind <= 0) {
          sprite.state = "charge";
          sprite.vx = (dx / dist) * 3;
          sprite.vz = (dz / dist) * 3;
        }
      } else {
        sprite.x += sprite.vx * dt;
        sprite.z += sprite.vz * dt;
        if (dist < 0.75 && this.player.invuln <= 0 && this.inThicket) this.bump(sprite);
        if (dist > 8) sprite.state = "idle";
      }
    }
    const active = this.sprites.filter((s) => s.enabled && !s.dispelled);
    if (this.sprites.some((s) => s.enabled) && active.length === 0 && !this.thicketCleared) {
      this.thicketCleared = true;
      this.toast = "The thicket is quiet. Something was left in the clearing.";
      this.toastT = 4;
    }
  }

  bump(sprite: Sprite): void {
    const dx = this.player.x - sprite.x;
    const dz = this.player.z - sprite.z;
    const d = Math.hypot(dx, dz) || 1;
    this.player.x += (dx / d) * 2;
    this.player.z += (dz / d) * 2;
    this.player.invuln = 1.5;
    this.thicketPips = Math.max(0, this.thicketPips - 1);
    sprite.state = "idle";
    if (this.thicketPips <= 0) {
      this.scatter = 0.8;
      this.toast = "Your light scatters…";
      this.toastT = 2;
    }
  }

  private respawnThicket(): void {
    this.player.x = THICKET_ENTRANCE.x;
    this.player.y = THICKET_ENTRANCE.y;
    this.player.z = THICKET_ENTRANCE.z;
    this.player.vx = this.player.vy = this.player.vz = 0;
    this.thicketPips = 3;
    this.inThicket = false;
    this.toast = "Back at the thicket's edge. Nothing lost.";
    this.toastT = 3;
  }

  private stepCritters(dt: number): void {
    for (const critter of this.critters) {
      const scare = this.lampRaised || this.flareAge < 0.25;
      const dx = critter.x - this.player.x;
      const dz = critter.z - this.player.z;
      const dist = Math.hypot(dx, dz) || 1;
      if (scare && dist < 6) {
        critter.x += (dx / dist) * 4 * dt;
        critter.z += (dz / dist) * 4 * dt;
      } else {
        critter.x += (critter.hx - critter.x) * dt;
        critter.z += (critter.hz - critter.z) * dt;
      }
    }
  }

  private stepWisps(dt: number): void {
    const pending = this.items.filter((item) => !this.found.has(item.id) && this.itemReachable(item));
    for (const wisp of this.wisps) {
      if (!wisp.awake) continue;
      const behind = Math.hypot(wisp.x - this.player.x, wisp.z - this.player.z);
      if (behind > 10) continue;
      const target = nearest(pending, wisp.x, wisp.z) ?? { x: 0, z: 190 };
      const dx = target.x - wisp.x;
      const dz = target.z - wisp.z;
      const dist = Math.hypot(dx, dz) || 1;
      if (dist < 1.4) wisp.arrived = true;
      else {
        wisp.x += (dx / dist) * 2.5 * dt;
        wisp.z += (dz / dist) * 2.5 * dt;
      }
    }
  }

  private stepMechanisms(dt: number): void {
    if (!this.bridge && this.lampRaised && this.dist(WHEEL.x, WHEEL.z) < 3 && Math.abs(this.player.y - WHEEL.y) < 2) {
      this.wheelT += dt;
      this.prompt = "Hold lamp near: thaw";
      if (this.wheelT >= 2) {
        this.bridge = true;
        this.toast = "The bridge is down.";
      }
    } else this.wheelT = 0;
    if (!this.liftDone && this.lampRaised && this.dist(LIFT.x, LIFT.z) < 3 && Math.abs(this.player.y - LIFT.y) < 2) {
      this.liftT += dt;
      if (this.liftT >= 2) {
        this.liftDone = true;
        this.player.y += 8;
      }
    } else if (!this.liftDone) this.liftT = 0;
  }

  private interact(): void {
    const item = this.nearestItem(2);
    if (item && this.itemReachable(item)) {
      this.found.add(item.id);
      this.card = item;
      return;
    }
    if (this.woken && this.player.z > 204 && this.found.has("C6") && this.found.has("C8")) this.endCard = true;
  }

  light(id: string): void {
    const marker = BRAZIERS.find((b) => b.id === id);
    if (!marker || this.lit.has(id)) return;
    if (!marker.terrace || this.woken) {
      this.lit.add(id);
      this.toast = "Brazier lit. Your light will return here.";
      this.toastT = 2.5;
      return;
    }
    const expect = GATEWICK_ORDER[this.orderStep];
    if (id === expect) {
      this.lit.add(id);
      this.orderStep += 1;
      this.toast = "Gatewick turns toward the warmest flame.";
      this.toastT = 2.2;
      this.gateYaw = Math.atan2(marker.x, marker.z - 192);
      if (this.orderStep >= GATEWICK_ORDER.length) {
        this.updrafts = true;
        this.toast = "Warm air rises around him.";
        this.toastT = 3;
      }
      return;
    }
    for (const b of BRAZIERS) if (b.terrace) this.lit.delete(b.id);
    this.orderStep = 0;
    this.wrongs += 1;
    this.toast = this.wrongs >= 2 ? "A brazier is pulsing. Start there." : "The flames gutter. Try another order.";
    this.toastT = 2.5;
  }

  private wake(): void {
    if (this.woken) return;
    this.woken = true;
    this.archiveOpen = true;
    this.sequence = 12;
    this.toast = "Gatewick wakes. The Spire is lit.";
    this.toastT = 4;
    this.prompt = "The Spire Archive is open.";
  }

  private prompts(): void {
    if (this.climbing) {
      this.climbing = false;
      this.prompt = "Climb";
      return;
    }
    if (this.prompt) return;
    const p = this.player;
    if (!this.lit.has("BR1") && p.z < 14) this.prompt = "Flare your lamp: light the brazier";
    else if (p.z > 16 && p.z < 34 && p.y < 3 && !this.stones.some((s) => s.solid)) this.prompt = "Hold lamp up: reveal the old stones";
    else if (!p.grounded && p.vy < 0) this.prompt = "Hold Jump to glide";
    else if (this.inThicket && !this.thicketCleared) this.prompt = "Flare to scatter the sprites. Three bumps and your light scatters.";
    else if (this.wisps.some((w) => !w.awake && Math.hypot(w.x - p.x, w.z - p.z) < 6)) this.prompt = "Flare to wake the wisp";
    else if (this.nearestItem(2)) this.prompt = "Read";
    else if (this.updrafts && !this.woken) this.prompt = "Warm air rises around him.";
    else if (this.archiveOpen && p.z > 200) this.prompt = "The Spire Archive is open.";
    else if (!this.lit.has("B1") && p.z > 170 && p.y > 30) this.prompt = "Gatewick has gone cold. The old keeper's pages spoke of an order.";
    else if (!this.inThicket && this.dist(THICKET_ENTRANCE.x, THICKET_ENTRANCE.z) < 7 && p.y < 5) this.prompt = "Gorse Thicket: prickly sprites live here. Optional.";
    else this.prompt = "";
  }

  pose(stage: "stones" | "journal" | "gatewick"): void {
    this.card = null;
    if (stage === "stones") {
      this.player.x = 6;
      this.player.y = 0;
      this.player.z = 16;
      this.player.yaw = 0;
      this.cameraYaw = 0.4;
      this.lampRaised = true;
      this.lit.add("BR1");
      this.stones.forEach((stone) => {
        stone.solid = true;
        stone.ever = true;
        stone.linger = 1e9;
      });
      this.prompt = "Hold lamp up: reveal the old stones";
      return;
    }
    if (stage === "journal") {
      const item = this.items.find((entry) => entry.id === "C3") ?? this.items[0];
      this.player.x = -30;
      this.player.y = 4;
      this.player.z = 78;
      this.cameraYaw = 0.8;
      if (item) {
        this.found.add(item.id);
        this.card = item;
      }
      return;
    }
    this.player.x = -2;
    this.player.y = 40;
    this.player.z = 174;
    this.player.grounded = true;
    this.cameraYaw = 0.35;
    this.cameraPitch = 0.08;
    this.light("B2");
    this.toast = "";
    this.toastT = 0;
    this.prompt = "Gatewick turns toward the warmest flame.";
  }

  supportAt(x: number, z: number, feet: number): Rect | null {
    let best: Rect | null = null;
    for (const rect of this.rects) {
      if (!this.rectOpen(rect)) continue;
      if (x < rect.x0 || x > rect.x1 || z < rect.z0 || z > rect.z1) continue;
      if (rect.y > feet + 0.05) continue;
      if (!best || rect.y > best.y) best = rect;
    }
    return best;
  }

  private rectOpen(rect: Rect): boolean {
    if (rect.id.startsWith("stone")) {
      const index = Number(rect.id.slice(5));
      return Boolean(this.stones[index]?.solid);
    }
    if (rect.gate === "bridge") return this.bridge;
    if (rect.gate === "head") return this.updrafts;
    if (rect.gate === "stairs" || rect.gate === "archive") return this.archiveOpen;
    if (rect.gate === "sky") return this.lit.has("BR5") || this.player.y > 30;
    return true;
  }

  private dist(x: number, z: number): number {
    return Math.hypot(this.player.x - x, this.player.z - z);
  }

  private nearLitBrazier(): boolean {
    return BRAZIERS.some((b) => this.lit.has(b.id) && this.dist(b.x, b.z) <= REFILL_R && Math.abs(this.player.y - b.y) < 3);
  }

  private nearestItem(radius: number): CareerItem | null {
    let best: CareerItem | null = null;
    let bestD = radius;
    for (const item of this.items) {
      if (this.found.has(item.id) || !this.itemReachable(item)) continue;
      const [x, y, z] = item.world.pos;
      const d = Math.hypot(this.player.x - x, this.player.z - z);
      if (d <= bestD && Math.abs(this.player.y - y) < 3) {
        best = item;
        bestD = d;
      }
    }
    return best;
  }

  private itemReachable(item: CareerItem): boolean {
    if (item.id === "P2" && !this.thicketCleared) return false;
    if ((item.id === "C6" || item.id === "C8" || item.id === "C5" || item.id === "C7") && !this.archiveOpen) return false;
    if (item.id === "C9" && !this.updrafts) return false;
    return item.status === "approved" || (this.dev && item.status === "placeholder");
  }

  private nextLandmark(): { x: number; z: number } | null {
    const markers: Marker[] = BRAZIERS;
    return markers.find((m) => !this.lit.has(m.id)) ?? { x: 0, z: 192 };
  }

  respawnBrazier(): void {
    const id = [...this.lit][this.lit.size - 1] ?? "BR1";
    const spot = BRAZIERS.find((b) => b.id === id) ?? BRAZIERS[0]!;
    this.player.x = spot.x;
    this.player.y = spot.y;
    this.player.z = spot.z + 1.2;
    this.player.vx = this.player.vy = this.player.vz = 0;
    this.player.grounded = true;
    this.fallFrom = spot.y;
  }

  hintId(): string | null {
    if (this.woken || this.orderStep >= GATEWICK_ORDER.length) return null;
    if (this.showOrder || (this.assists.hintPulses && this.wrongs >= 2)) return GATEWICK_ORDER[this.orderStep] ?? null;
    return null;
  }
}

function insideThicket(x: number, y: number, z: number): boolean {
  return x >= THICKET.x0 && x <= THICKET.x1 && y >= THICKET.y0 && y <= THICKET.y1 && z >= THICKET.z0 && z <= THICKET.z1;
}

function approach(value: number, target: number, maxDelta: number): number {
  const delta = target - value;
  if (Math.abs(delta) <= maxDelta) return target;
  return value + Math.sign(delta) * maxDelta;
}

function damp(value: number, target: number, lambda: number, dt: number): number {
  return value + (target - value) * (1 - Math.exp(-lambda * dt));
}

function moveYawLimited(current: number, target: number, maxStep: number): number {
  const delta = clamp(wrapAngle(target - current), -maxStep, maxStep);
  return wrapAngle(current + delta);
}

function nearest(items: CareerItem[], x: number, z: number): { x: number; z: number } | null {
  let best: CareerItem | null = null;
  let bestD = 1e9;
  for (const item of items) {
    const d = Math.hypot(item.world.pos[0] - x, item.world.pos[2] - z);
    if (d < bestD) {
      best = item;
      bestD = d;
    }
  }
  return best ? { x: best.world.pos[0], z: best.world.pos[2] } : null;
}

export function mainCareerIds(dev = false): string[] {
  return shipItems(dev).filter((item) => item.kind === "career" && item.status === "approved").map((item) => item.id);
}
