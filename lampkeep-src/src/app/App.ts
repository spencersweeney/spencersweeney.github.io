import { pathCenterX } from "../world/checkpoints";
import { MistRoad } from "../world/MistRoadLevel";
import type { CheckpointId, FrameInput } from "../world/types";
import { DEFAULT_ASSISTS, type AssistSettings, type TelegraphStyle } from "../content/assists";
import { STR } from "../content/strings";
import { demoPolicy } from "./demoPolicy";
import { screenHTML, type ScreenModel } from "./screens";
import { FollowCamera } from "../camera/FollowCamera";
import { InputManager } from "../input/InputManager";
import type { Bindings } from "../input/bindings";
import { PS1Pipeline } from "../render/PS1Pipeline";
import { setPS1Flags } from "../render/pixelate";
import { unlockAudio } from "../render/sfx";
import { buildView } from "../world/props";
import { HUD } from "../ui/HUD";
import { TouchControls } from "../ui/TouchControls";
import {
  browserStore,
  defaultSave,
  hasContinue,
  loadSave,
  resolvedBindings,
  saveState,
  type SaveData,
} from "../save/storage";

export type ScreenName =
  | "title"
  | "controls"
  | "play"
  | "pause"
  | "settings"
  | "about"
  | "story"
  | "ending"
  | "dead";

export class App {
  screen: ScreenName = "title";
  private returnTo: ScreenName = "title";
  private save: SaveData;
  private readonly sim: MistRoad;
  private readonly pipeline: PS1Pipeline;
  private readonly view: ReturnType<typeof buildView>;
  private readonly rig: FollowCamera;
  private readonly input: InputManager;
  private readonly hud: HUD;
  private readonly screenRoot: HTMLElement;
  private listening: keyof Bindings | null = null;
  private hold = false;
  private readonly demo: boolean;
  private readonly forceTouch: boolean;
  private acc = 0;
  private last = performance.now();
  private viewTime = 0;
  private fps = 60;
  private systemReduced = false;
  private webglOk = true;

  constructor() {
    this.save = loadSave() ?? defaultSave();
    this.sim = new MistRoad(this.save.assists);
    const canvas = document.querySelector("#view") as HTMLCanvasElement;
    this.screenRoot = document.querySelector("#ui") as HTMLElement;
    this.screenRoot.innerHTML = `<div id="screen"></div><p id="boot" class="panel" role="status">${STR.loading}</p>`;
    try {
      this.pipeline = new PS1Pipeline(canvas);
      this.view = buildView();
      this.webglOk = true;
    } catch (err) {
      console.error(err);
      this.webglOk = false;
      this.pipeline = null as unknown as PS1Pipeline;
      this.view = null as unknown as ReturnType<typeof buildView>;
    }
    this.rig = this.webglOk ? new FollowCamera(this.pipeline.camera) : (null as unknown as FollowCamera);
    this.input = new InputManager(canvas, () => resolvedBindings(this.save.bindings));
    this.hud = new HUD(document.body);
    new TouchControls(document.body, this.input);
    this.hud.bind(
      () => {
        this.input.touch.pause = true;
      },
      () => {
        this.input.touch.lock = true;
      },
    );
    const params = new URLSearchParams(location.search);
    this.demo = params.has("demo");
    this.forceTouch = params.has("touch");
    this.systemReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (e) => {
      this.systemReduced = e.matches;
    });
    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });
    window.addEventListener("resize", () => this.resize());
    this.resize();
    this.show("title");
    if (this.webglOk) {
      const boot = document.querySelector("#boot");
      boot?.remove();
      requestAnimationFrame(this.frame);
      if (this.demo) this.begin();
    } else {
      const boot = document.querySelector("#boot");
      if (boot) boot.textContent = STR.webglError;
    }
    const api = {
      get screen() {
        return app.screen;
      },
      get player() {
        return { x: app.sim.player.x, z: app.sim.player.z, hp: app.sim.player.hp, yaw: app.sim.player.yaw };
      },
      get fps() {
        return app.fps;
      },
      get outcome() {
        return app.sim.outcome;
      },
      stage: (kind: "road" | "boss") => app.stage(kind),
      fast: (seconds: number) => app.fast(seconds),
    };
    window.__LAMPKEEP = api;
  }

  start(): void {
    /* constructed ready */
  }

  private frame = (now: number): void => {
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.viewTime += dt;
    this.fps = this.fps * 0.9 + (1 / Math.max(dt, 0.001)) * 0.1;
    const reduced = this.reducedNow();
    const playing = this.screen === "play" && this.sim.outcome === "play" && !this.hold && this.webglOk;
    const sample = this.input.sample(dt, playing, reduced);
    if (sample.pause) this.onPause();
    if (playing) {
      this.acc += dt;
      let first = true;
      let guard = 0;
      while (this.acc >= 1 / 60 && guard++ < 5) {
        const input = this.demo
          ? demoPolicy(this.sim)
          : first
            ? strip(sample)
            : { ...strip(sample), lookX: 0, lookY: 0, dodge: false, flare: false, lockOn: false, interact: false };
        const before = this.sim.checkpoint;
        this.sim.step(1 / 60, input);
        if (this.sim.checkpoint !== before) this.rememberCheckpoint(this.sim.checkpoint);
        this.acc -= 1 / 60;
        first = false;
      }
      if (this.sim.outcome === "clear") {
        this.rememberCheckpoint("cleared");
        this.show("ending");
      } else if (this.sim.outcome === "dead") this.show("dead");
    }
    if (!this.webglOk) return;
    const menu = this.screen !== "play" && this.screen !== "pause" && this.screen !== "dead";
    if (menu && !reduced) this.rig.sway = Math.sin(this.viewTime * 0.28) * 0.42;
    else this.rig.dampSway(0, dt);
    this.rig.update(this.sim, this.view.colliders, dt);
    this.view.update(this.sim, this.viewTime, reduced);
    setPS1Flags({ snap: !reduced, wobble: this.save.textureWobble && !reduced });
    this.pipeline.setFov(this.save.fov);
    this.pipeline.noteFrame(dt);
    this.pipeline.render(this.view.scene);
    if (this.screen === "play" || this.screen === "pause") this.hud.update(this.sim, dt);
    if (this.input.consumePadLost()) this.hud.toast(STR.padLost);
    requestAnimationFrame(this.frame);
  };

  private resize(): void {
    if (this.webglOk) this.pipeline.setSize(window.innerWidth, window.innerHeight);
    const portrait = window.innerHeight > window.innerWidth && window.innerWidth < 760;
    const touch = this.forceTouch || window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 900;
    document.body.classList.toggle("is-portrait", portrait);
    document.body.classList.toggle("touch-ui", touch);
    document.body.classList.toggle("force-touch", this.forceTouch);
  }

  private show(screen: ScreenName): void {
    if (screen === "settings" || screen === "controls" || screen === "about" || screen === "story") {
      if (this.screen === "title" || this.screen === "pause" || this.screen === "ending" || this.screen === "dead") {
        this.returnTo = this.screen;
      }
    }
    this.screen = screen;
    document.body.classList.remove(
      "mode-title", "mode-controls", "mode-play", "mode-pause", "mode-settings", "mode-about", "mode-story", "mode-ending", "mode-dead",
    );
    document.body.classList.add(`mode-${screen}`);
    const root = document.querySelector("#screen") as HTMLElement;
    const model: ScreenModel = {
      screen,
      canContinue: hasContinue(this.save),
      assistsOn: this.save.assists.master,
      assists: this.save.assists,
      bindings: resolvedBindings(this.save.bindings),
      fov: this.save.fov,
      textureWobble: this.save.textureWobble,
      reduced: this.save.reducedMotion === null ? "auto" : this.save.reducedMotion ? "on" : "off",
      listening: this.listening,
    };
    root.innerHTML = screenHTML(model);
    this.bind(root);
    const first = root.querySelector("button") as HTMLButtonElement | null;
    first?.focus();
  }

  private bind(root: HTMLElement): void {
    const click = (id: string, fn: () => void) => {
      root.querySelector(`#${id}`)?.addEventListener("click", fn);
    };
    click("begin", () => this.begin());
    click("continue", () => this.continue());
    click("controls", () => this.show("controls"));
    click("settings", () => this.show("settings"));
    click("about", () => this.show("about"));
    click("story", () => this.show("story"));
    click("back", () => this.show(this.returnTo));
    click("resume", () => this.show("play"));
    click("title-btn", () => {
      this.hold = false;
      this.show("title");
    });
    click("retry", () => {
      this.sim.respawn();
      this.sim.setAssists(this.save.assists);
      this.hold = false;
      this.show("play");
    });
    click("reset", () => {
      this.save.checkpointId = "spawn";
      this.persist();
      this.show("settings");
    });
    const box = (id: string, key: keyof AssistSettings) => {
      root.querySelector(`#${id}`)?.addEventListener("change", (ev) => {
        const on = (ev.target as HTMLInputElement).checked;
        if (key === "master" || key === "damageAssist" || key === "extraIframes" || key === "softLock" || key === "cameraRecenter" || key === "showPrompts" || key === "slowCombat") {
          this.save.assists = { ...this.save.assists, [key]: on };
          this.sim.setAssists(this.save.assists);
          this.persist();
        }
      });
    };
    box("assist-master", "master");
    box("assist-damage", "damageAssist");
    box("assist-dodge", "extraIframes");
    box("assist-soft", "softLock");
    box("assist-recenter", "cameraRecenter");
    box("assist-prompts", "showPrompts");
    box("assist-slow", "slowCombat");
    root.querySelector("#wobble")?.addEventListener("change", (ev) => {
      this.save.textureWobble = (ev.target as HTMLInputElement).checked;
      this.persist();
    });
    root.querySelector("#telegraph")?.addEventListener("change", (ev) => {
      this.save.assists = { ...this.save.assists, telegraphStyle: (ev.target as HTMLSelectElement).value as TelegraphStyle };
      this.sim.setAssists(this.save.assists);
      this.persist();
    });
    root.querySelector("#reduced")?.addEventListener("change", (ev) => {
      const value = (ev.target as HTMLSelectElement).value;
      this.save.reducedMotion = value === "auto" ? null : value === "on";
      this.persist();
    });
    root.querySelector("#fov")?.addEventListener("input", (ev) => {
      this.save.fov = Number((ev.target as HTMLInputElement).value);
      const label = root.querySelector("label[for=fov]");
      if (label) label.firstChild!.textContent = STR.fovValue(this.save.fov);
      this.persist();
    });
    root.querySelectorAll<HTMLButtonElement>("[data-bind]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.bind as keyof Bindings;
        this.listening = action;
        this.show("settings");
        this.input.capture = (code) => {
          this.listening = null;
          if (code !== "Escape") {
            const next = action === "attack" ? [code, "mouse0"] : action === "lockOn" ? [code, "mouse2"] : [code];
            this.save.bindings = { ...this.save.bindings, [action]: next };
            this.persist();
          }
          this.show("settings");
        };
      });
    });
  }

  private begin(): void {
    if (!this.webglOk) return;
    this.sim.reset();
    this.sim.setAssists(this.save.assists);
    this.hold = false;
    this.acc = 0;
    this.show("play");
  }

  private continue(): void {
    if (!hasContinue(this.save) || !this.webglOk) return;
    if (this.save.checkpointId === "cleared") {
      this.sim.loadCheckpoint("cleared");
      this.show("ending");
      return;
    }
    this.sim.loadCheckpoint(this.save.checkpointId);
    this.sim.setAssists(this.save.assists);
    this.hold = false;
    this.show("play");
  }

  private onPause(): void {
    if (this.input.capture) return;
    if (this.screen === "play") this.show("pause");
    else if (this.screen === "pause") this.show("play");
    else if (this.screen === "settings" || this.screen === "controls" || this.screen === "about" || this.screen === "story") {
      this.show(this.returnTo);
    }
  }

  private rememberCheckpoint(id: CheckpointId): void {
    if (id === "spawn") return;
    this.save.checkpointId = id;
    this.persist();
  }

  private persist(): void {
    this.save.updatedAt = new Date().toISOString();
    saveState(this.save, browserStore());
  }

  private reducedNow(): boolean {
    if (this.save.reducedMotion === null) return this.systemReduced;
    return this.save.reducedMotion;
  }

  private stage(kind: "road" | "boss"): void {
    if (!this.webglOk) return;
    this.sim.reset();
    this.sim.setAssists({ ...DEFAULT_ASSISTS, ...this.save.assists });
    this.hold = true;
    if (kind === "road") {
      const a = this.sim.enemies[0];
      const b = this.sim.enemies[1];
      this.sim.player.x = pathCenterX(4.2);
      this.sim.player.z = 4.2;
      this.sim.player.yaw = 0;
      this.sim.cameraYaw = 0;
      this.sim.cameraPitch = 0.18;
      for (const e of [a, b]) {
        e.state = "telegraph";
        e.telegraphShape = "circle";
        e.telegraphR = 1.1;
        e.markX = e.x;
        e.markZ = e.z;
        e.windLeft = 0.5;
        e.windTotal = 0.55;
      }
      this.sim.prompt = STR.promptGorse;
      this.sim.promptT = 30;
    } else {
      for (const e of this.sim.enemies) {
        if (e.kind !== "gatewick") e.alive = false;
      }
      const boss = this.sim.enemies.find((e) => e.kind === "gatewick")!;
      boss.hp = 9;
      boss.state = "telegraph";
      boss.telegraphShape = "circle";
      boss.telegraphR = 3.2;
      boss.markX = boss.x;
      boss.markZ = boss.z;
      boss.windLeft = 0.6;
      boss.windTotal = 0.7;
      this.sim.player.x = 0;
      this.sim.player.z = 52.2;
      this.sim.player.yaw = 0;
      this.sim.cameraYaw = 0;
      this.sim.cameraPitch = 0.16;
      this.sim.bossFight = true;
      this.sim.prompt = STR.bossIntro;
      this.sim.promptT = 30;
      this.sim.visitedTrail = true;
      this.sim.visitedGate = true;
    }
    this.show("play");
    if (this.webglOk) {
      this.view.update(this.sim, this.viewTime, this.reducedNow());
      this.rig.sway = 0;
      this.rig.snap = true;
      this.rig.update(this.sim, this.view.colliders, 0.016);
      this.pipeline.render(this.view.scene);
      this.hud.update(this.sim, 0);
    }
  }

  private fast(seconds: number): void {
    if (!this.webglOk) return;
    this.hold = false;
    this.show("play");
    const steps = Math.round(seconds * 60);
    for (let i = 0; i < steps && this.sim.outcome === "play"; i++) {
      this.sim.step(1 / 60, demoPolicy(this.sim));
    }
    this.view.update(this.sim, this.viewTime, false);
    this.rig.update(this.sim, this.view.colliders, 0.05);
    this.pipeline.render(this.view.scene);
  }
}

function strip(sample: FrameInput & { pause: boolean }): FrameInput {
  return {
    moveX: sample.moveX,
    moveY: sample.moveY,
    lookX: sample.lookX,
    lookY: sample.lookY,
    attack: sample.attack,
    dodge: sample.dodge,
    flare: sample.flare,
    lockOn: sample.lockOn,
    interact: sample.interact,
    slow: sample.slow,
  };
}

const app = new App();

declare global {
  interface Window {
    __LAMPKEEP?: {
      readonly screen: ScreenName;
      readonly player: { x: number; z: number; hp: number; yaw: number };
      readonly fps: number;
      readonly outcome: string;
      stage: (kind: "road" | "boss") => void;
      fast: (seconds: number) => void;
    };
  }
}

void app;
