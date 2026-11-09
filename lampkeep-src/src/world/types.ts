export type EnemyKind = "gorse" | "wisp" | "gatewick";
export type AttackPhase = "idle" | "windup" | "active" | "recovery";
export type TelegraphShape = "none" | "circle" | "cone";
export type CheckpointId = "spawn" | "trail_shrine" | "gate_threshold" | "cleared";
export type Outcome = "play" | "dead" | "clear";

export interface AttackState {
  phase: AttackPhase;
  /** Time in the current phase, seconds. */
  t: number;
  hitIds: string[];
}

export interface PlayerState {
  x: number;
  y: number;
  z: number;
  yaw: number;
  vy: number;
  hp: number;
  oil: number;
  grounded: boolean;
  attack: AttackState;
  dodging: boolean;
  dodgeT: number;
  dodgeDx: number;
  dodgeDz: number;
  dodgeCd: number;
  /** Remaining i-frame time, seconds. */
  iframes: number;
  hurtT: number;
  kbx: number;
  kbz: number;
  kbT: number;
  flaring: boolean;
  flareT: number;
  flareHitIds: string[];
  alive: boolean;
  moving: boolean;
}

export interface EnemyState {
  id: string;
  kind: EnemyKind;
  x: number;
  y: number;
  z: number;
  yaw: number;
  hp: number;
  maxHp: number;
  alive: boolean;
  homeX: number;
  homeZ: number;
  summon: boolean;
  state: "idle" | "telegraph" | "recover" | "stun";
  windTotal: number;
  windLeft: number;
  recoverLeft: number;
  stunLeft: number;
  attackCd: number;
  /** 0 idle, 1 first slam ring, 2 second slam ring. */
  ring: 0 | 1 | 2;
  sweeps: number;
  telegraphShape: TelegraphShape;
  telegraphR: number;
  /** Full cone angle in degrees. */
  telegraphCone: number;
  telegraphLen: number;
  aimX: number;
  aimZ: number;
  /** Fixed slam / circle center. */
  markX: number;
  markZ: number;
  hop: number;
  strafe: number;
  strafeT: number;
  pendingSummon: boolean;
}

export interface FrameInput {
  moveX: number;
  moveY: number;
  lookX: number;
  lookY: number;
  /** When set, replaces camera yaw (tests). Radians, 0 faces +Z. */
  aimYaw?: number;
  /** When set, movement is relative to this yaw instead of the camera. */
  moveYaw?: number;
  attack: boolean;
  dodge: boolean;
  flare: boolean;
  lockOn: boolean;
  interact: boolean;
  slow: boolean;
}

export const IDLE_INPUT: FrameInput = {
  moveX: 0,
  moveY: 0,
  lookX: 0,
  lookY: 0,
  attack: false,
  dodge: false,
  flare: false,
  lockOn: false,
  interact: false,
  slow: false,
};
