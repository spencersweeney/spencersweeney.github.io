import { DEFAULT_BINDINGS, type Bindings } from "./bindings";
import type { FrameInput } from "../world/types";

export interface TouchState {
  down: boolean;
  x: number;
  y: number;
  attack: boolean;
  dodge: boolean;
  flare: boolean;
  lock: boolean;
  pause: boolean;
  lookX: number;
  lookY: number;
  look: boolean;
}

function deadzone(v: number, threshold = 0.15): number {
  const a = Math.abs(v);
  if (a < threshold) return 0;
  return Math.sign(v) * ((a - threshold) / (1 - threshold));
}

export class InputManager {
  readonly touch: TouchState = {
    down: false, x: 0, y: 0, attack: false, dodge: false, flare: false, lock: false, pause: false,
    lookX: 0, lookY: 0, look: false,
  };
  capture: ((code: string) => void) | null = null;
  private readonly keys = new Set<string>();
  private readonly edges = new Set<string>();
  private mouseX = 0;
  private mouseY = 0;
  private padLost = false;
  private sawPad = false;
  private prevButtons: boolean[] = [];

  constructor(
    canvas: HTMLCanvasElement,
    private readonly getBindings: () => Bindings,
  ) {
    window.addEventListener("keydown", (e) => {
      if (this.capture && !e.repeat) {
        e.preventDefault();
        const fn = this.capture;
        this.capture = null;
        fn(e.code);
        return;
      }
      if (e.repeat) return;
      this.keys.add(e.code);
      this.edges.add(e.code);
      if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) e.preventDefault();
    });
    window.addEventListener("keyup", (e) => this.keys.delete(e.code));
    window.addEventListener("blur", () => {
      this.keys.clear();
      this.edges.clear();
    });
    canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    canvas.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "touch") return;
      if (e.button === 0) {
        this.keys.add("mouse0");
        this.edges.add("mouse0");
        if (document.pointerLockElement !== canvas) canvas.requestPointerLock();
      } else if (e.button === 2) {
        this.keys.add("mouse2");
        this.edges.add("mouse2");
      }
    });
    window.addEventListener("pointerup", (e) => {
      if (e.button === 0) this.keys.delete("mouse0");
      if (e.button === 2) this.keys.delete("mouse2");
    });
    window.addEventListener("mousemove", (e) => {
      if (document.pointerLockElement === canvas || (e.buttons & 1) === 1) {
        this.mouseX += e.movementX;
        this.mouseY += e.movementY;
      }
    });
    window.addEventListener("gamepadconnected", () => {
      this.sawPad = true;
    });
    window.addEventListener("gamepaddisconnected", () => {
      if (this.sawPad) this.padLost = true;
    });
  }

  consumePadLost(): boolean {
    const lost = this.padLost;
    this.padLost = false;
    return lost;
  }

  sample(dt: number, playing: boolean, reduced: boolean): FrameInput & { pause: boolean } {
    const bindings = { ...DEFAULT_BINDINGS, ...this.getBindings() };
    const sens = reduced ? 0.00115 : 0.0023;
    let lookX = this.mouseX * sens;
    let lookY = this.mouseY * sens;
    this.mouseX = 0;
    this.mouseY = 0;
    if (this.touch.look) {
      lookX = this.touch.lookX * (reduced ? 0.0022 : 0.0045);
      lookY = this.touch.lookY * (reduced ? 0.0022 : 0.0045);
    }
    this.touch.lookX = 0;
    this.touch.lookY = 0;

    const pad = this.readPad(dt, reduced);
    if (pad && (Math.abs(pad.lookX) + Math.abs(pad.lookY) > 0) && !this.touch.look) {
      lookX = pad.lookX;
      lookY = pad.lookY;
    }

    let moveX = 0;
    let moveY = 0;
    if (this.touch.down) {
      moveX = deadzone(this.touch.x);
      moveY = deadzone(this.touch.y);
    } else if (pad && (Math.abs(pad.moveX) > 0 || Math.abs(pad.moveY) > 0)) {
      moveX = pad.moveX;
      moveY = pad.moveY;
    } else {
      if (this.held(bindings.left)) moveX -= 1;
      if (this.held(bindings.right)) moveX += 1;
      if (this.held(bindings.up)) moveY += 1;
      if (this.held(bindings.down)) moveY -= 1;
    }

    const attack = this.touch.attack || this.held(bindings.attack) || !!pad?.attack;
    const dodge = this.touch.dodge || this.edged(bindings.dodge) || !!pad?.dodge;
    const flare = this.touch.flare || this.edged(bindings.flare) || !!pad?.flare;
    const lockOn = this.touch.lock || this.edged(bindings.lockOn) || !!pad?.lock;
    const interact = this.edged(bindings.interact);
    const pause = this.touch.pause || this.edged(bindings.pause) || !!pad?.pause;
    const slow = this.keys.has("AltLeft") || this.keys.has("AltRight") || !!pad?.slow;
    this.touch.dodge = false;
    this.touch.flare = false;
    this.touch.lock = false;
    this.touch.pause = false;
    this.edges.clear();

    if (!playing) {
      return {
        moveX: 0, moveY: 0, lookX: 0, lookY: 0,
        attack: false, dodge: false, flare: false, lockOn: false, interact: false, slow: false, pause,
      };
    }
    return { moveX, moveY, lookX, lookY, attack, dodge, flare, lockOn, interact, slow, pause };
  }

  private held(codes: string[]): boolean {
    return codes.some((code) => this.keys.has(code));
  }

  private edged(codes: string[]): boolean {
    return codes.some((code) => this.edges.has(code));
  }

  private readPad(dt: number, reduced: boolean): {
    moveX: number; moveY: number; lookX: number; lookY: number;
    attack: boolean; dodge: boolean; flare: boolean; lock: boolean; pause: boolean; slow: boolean;
  } | null {
    const pads = navigator.getGamepads?.() ?? [];
    const pad = Array.from(pads).find((g) => g && g.connected);
    if (!pad) return null;
    this.sawPad = true;
    const b = pad.buttons.map((button) => button.pressed || button.value > 0.5);
    const edge = (index: number) => b[index] && !this.prevButtons[index];
    this.prevButtons = b;
    const rate = (reduced ? 1.05 : 2.1) * dt;
    return {
      moveX: deadzone(pad.axes[0] ?? 0),
      moveY: deadzone(-(pad.axes[1] ?? 0)),
      lookX: deadzone(pad.axes[2] ?? 0) * rate,
      lookY: deadzone(pad.axes[3] ?? 0) * rate,
      attack: !!b[0],
      dodge: edge(1),
      flare: edge(2),
      lock: edge(3) || edge(11),
      pause: edge(9),
      slow: (pad.buttons[6]?.value ?? 0) > 0.5,
    };
  }
}
