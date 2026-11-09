import { DEFAULT_BINDINGS, type Bindings } from "./bindings";
import type { PlayInput } from "../world/valley";

export interface TouchState {
  down: boolean;
  x: number;
  y: number;
  jump: boolean;
  lamp: boolean;
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
    down: false, x: 0, y: 0, jump: false, lamp: false, pause: false, lookX: 0, lookY: 0, look: false,
  };
  capture: ((code: string) => void) | null = null;
  private readonly keys = new Set<string>();
  private readonly edges = new Set<string>();
  private mouseX = 0;
  private mouseY = 0;
  private padLost = false;
  private sawPad = false;
  private prevButtons: boolean[] = [];
  private lampSince = 0;
  private flareQueued = false;

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
      this.lampSince = 0;
    });
    canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    canvas.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "touch") return;
      if (e.button === 0) {
        this.keys.add("mouse0");
        this.edges.add("mouse0");
        if (document.pointerLockElement !== canvas) void canvas.requestPointerLock();
      }
    });
    window.addEventListener("pointerup", (e) => {
      if (e.button === 0) this.keys.delete("mouse0");
    });
    window.addEventListener("mousemove", (e) => {
      if (document.pointerLockElement === canvas) {
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

  sample(dt: number, playing: boolean, sens: number, invertY: boolean): PlayInput & { pause: boolean } {
    const bindings = { ...DEFAULT_BINDINGS, ...this.getBindings() };
    const lookScale = 0.0022 * sens;
    let lookX = this.mouseX * lookScale;
    let lookY = this.mouseY * lookScale;
    this.mouseX = 0;
    this.mouseY = 0;
    if (this.touch.look) {
      lookX = this.touch.lookX * lookScale * 2;
      lookY = this.touch.lookY * lookScale * 2;
    }
    this.touch.lookX = 0;
    this.touch.lookY = 0;
    const pad = this.readPad(dt, sens);
    if (pad && Math.abs(pad.lookX) + Math.abs(pad.lookY) > 0 && !this.touch.look) {
      lookX = pad.lookX;
      lookY = pad.lookY;
    }
    if (invertY) lookY *= -1;

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

    const lampHeld = this.touch.lamp || this.held(bindings.lamp) || !!pad?.lamp;
    const now = performance.now();
    if (lampHeld && this.lampSince === 0) this.lampSince = now;
    if (!lampHeld && this.lampSince > 0) {
      if (now - this.lampSince < 180) this.flareQueued = true;
      this.lampSince = 0;
    }
    const lamp = lampHeld && now - this.lampSince >= 160;
    const flare = this.flareQueued;
    this.flareQueued = false;
    const jump = this.touch.jump || this.held(bindings.jump) || !!pad?.jump;
    const interact = this.edged(bindings.interact) || !!pad?.interact;
    const pause = this.touch.pause || this.edged(bindings.pause) || !!pad?.pause;
    const run = this.held(bindings.run) || Math.hypot(moveX, moveY) > 0.8;
    this.touch.pause = false;
    this.edges.clear();
    if (!playing) {
      return { moveX: 0, moveY: 0, lookX: 0, lookY: 0, jump: false, lamp: false, flare: false, interact: false, run: false, dismiss: false, pause };
    }
    return { moveX, moveY, lookX, lookY, jump, lamp, flare, interact, run, dismiss: false, pause };
  }

  private held(codes: string[]): boolean {
    return codes.some((code) => this.keys.has(code));
  }

  private edged(codes: string[]): boolean {
    return codes.some((code) => this.edges.has(code));
  }

  private readPad(dt: number, sens: number): {
    moveX: number; moveY: number; lookX: number; lookY: number;
    jump: boolean; lamp: boolean; interact: boolean; pause: boolean;
  } | null {
    const pads = navigator.getGamepads?.() ?? [];
    const pad = Array.from(pads).find((g) => g && g.connected);
    if (!pad) return null;
    this.sawPad = true;
    const b = pad.buttons.map((button) => button.pressed || button.value > 0.5);
    const edge = (index: number) => !!b[index] && !this.prevButtons[index];
    this.prevButtons = b;
    const rate = 2.2 * sens * dt;
    return {
      moveX: deadzone(pad.axes[0] ?? 0),
      moveY: deadzone(-(pad.axes[1] ?? 0)),
      lookX: deadzone(pad.axes[2] ?? 0) * rate,
      lookY: deadzone(pad.axes[3] ?? 0) * rate,
      jump: !!b[0],
      lamp: !!b[2] || (pad.buttons[7]?.value ?? 0) > 0.4,
      interact: edge(3),
      pause: edge(9),
    };
  }
}
