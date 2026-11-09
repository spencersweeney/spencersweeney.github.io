import { STR } from "../content/strings";
import { demoInput } from "./demoPolicy";
import {
  confirmHTML,
  creditsHTML,
  endingHTML,
  journalHTML,
  pauseHTML,
  settingsHTML,
  storyHTML,
  titleHTML,
} from "./screens";
import { FollowCamera } from "../camera/FollowCamera";
import { InputManager } from "../input/InputManager";
import type { Bindings } from "../input/bindings";
import { resolvedBindings, loadSave, saveState, defaultSave, type SaveData } from "../save/storage";
import { PS1Pipeline } from "../render/PS1Pipeline";
import { setPS1Flags } from "../render/pixelate";
import { blip, unlockAudio } from "../render/sfx";
import { HUD } from "../ui/HUD";
import { TouchControls } from "../ui/TouchControls";
import { Valley, type PlayInput } from "../world/valley";
import { buildView, type ValleyView } from "../world/view";

type ScreenName = "title" | "play" | "pause" | "settings" | "story" | "credits" | "confirm" | "ending";
type StageName = "stones" | "journal" | "gatewick";

export class App {
  screen: ScreenName = "title";
  private returnTo: ScreenName = "title";
  private save: SaveData;
  private readonly sim: Valley;
  private readonly pipeline: PS1Pipeline | null;
  private readonly view: ValleyView | null;
  private readonly rig: FollowCamera | null;
  private readonly input: InputManager;
  private readonly hud: HUD;
  private readonly screenRoot: HTMLElement;
  private listening: keyof Bindings | null = null;
  private hold = false;
  private readonly demo: boolean;
  private readonly stageName: StageName | null;
  private acc = 0;
  private last = performance.now();
  private fps = 60;
  private cardShown = "";
  private webglOk = true;

  constructor() {
    this.save = loadSave() ?? defaultSave();
    const dev = Boolean(import.meta.env.DEV) || new URLSearchParams(location.search).has("dev");
    this.sim = new Valley({ dev, assists: this.save.settings.assists });
    const canvas = document.querySelector("#view") as HTMLCanvasElement;
    this.screenRoot = document.querySelector("#ui") as HTMLElement;
    this.screenRoot.innerHTML = `<div id="screen"></div>`;
    try {
      this.pipeline = new PS1Pipeline(canvas);
      this.pipeline.camera.far = 320;
      this.pipeline.camera.updateProjectionMatrix();
      this.view = buildView();
      this.rig = new FollowCamera(this.pipeline.camera);
      this.webglOk = true;
    } catch (err) {
      console.error(err);
      this.webglOk = false;
      this.pipeline = null;
      this.view = null;
      this.rig = null;
    }
    this.input = new InputManager(canvas, () => resolvedBindings(this.save.settings.bindings));
    this.hud = new HUD(document.body);
    new TouchControls(document.body, this.input);
    this.hud.bind(() => {
      this.input.touch.pause = true;
    });
    const params = new URLSearchParams(location.search);
    this.demo = params.has("demo");
    const stage = params.get("stage");
    this.stageName = stage === "stones" || stage === "journal" || stage === "gatewick" ? stage : null;
    this.applyText();
    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });
    window.addEventListener("resize", () => this.resize());
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.sim.card) this.dismissCard();
    });
    this.resize();
    this.show("title");
    const api = {
      get screen() { return app.screen; },
      get player() { return { x: app.sim.player.x, y: app.sim.player.y, z: app.sim.player.z, yaw: app.sim.player.yaw }; },
      get fps() { return app.fps; },
      stage: (name: StageName) => app.pose(name),
      teleport: (x: number, y: number, z: number) => {
        app.sim.player.x = x;
        app.sim.player.y = y;
        app.sim.player.z = z;
        app.sim.player.grounded = true;
      },
      hold: (value: boolean) => { app.hold = value; },
    };
    Object.assign(window, { __LAMPKEEP: api });
    if (this.webglOk) requestAnimationFrame(this.frame);
    else this.failWebGL();
    if (this.demo || this.stageName) this.begin(false);
  }

  private pose(name: StageName): void {
    this.hold = true;
    this.sim.pose(name);
    this.show("play");
    this.syncCard();
  }

  private failWebGL(): void {
    this.screenRoot.innerHTML = `<div id="screen"><section class="panel"><p>${STR.webgl}</p><p><a href="/lampkeep/career/">Spencer's career page</a></p></section></div>`;
  }

  private resize(): void {
    this.pipeline?.setSize(window.innerWidth, window.innerHeight);
    const portrait = window.innerHeight > window.innerWidth && window.innerWidth < 900;
    document.body.classList.toggle("is-portrait", portrait);
    document.body.classList.toggle("touch-ui", portrait || window.matchMedia("(pointer: coarse)").matches || new URLSearchParams(location.search).has("touch"));
  }

  private show(name: ScreenName): void {
    this.screen = name;
    document.body.className = `mode-${name}${document.body.classList.contains("is-portrait") ? " is-portrait" : ""}${document.body.classList.contains("touch-ui") ? " touch-ui" : ""}`;
    const host = this.screenRoot.querySelector("#screen") as HTMLElement;
    host.innerHTML = this.markup(name);
    this.hud.root.hidden = name !== "play";
    this.bind(host);
    const focus = host.querySelector<HTMLElement>("[autofocus], button, a");
    focus?.focus();
    this.applyMotion();
  }

  private markup(name: ScreenName): string {
    if (name === "title") return titleHTML(this.save.foundIds.length > 0 || this.save.litBraziers.length > 0);
    if (name === "confirm") return confirmHTML();
    if (name === "story") return storyHTML();
    if (name === "credits") return creditsHTML();
    if (name === "pause") return pauseHTML(this.sim.player.z > 170 && this.sim.player.y > 30);
    if (name === "ending") return endingHTML();
    if (name === "settings") return settingsHTML(this.save.settings, resolvedBindings(this.save.settings.bindings));
    return "";
  }

  private bind(host: HTMLElement): void {
    host.querySelector("#play")?.addEventListener("click", () => this.begin(false));
    host.querySelector("#continue")?.addEventListener("click", () => this.begin(true));
    host.querySelector("#new-journey")?.addEventListener("click", () => this.show("confirm"));
    host.querySelector("#start-new")?.addEventListener("click", () => this.begin(false));
    host.querySelector("#cancel-new")?.addEventListener("click", () => this.show("title"));
    host.querySelector("#story")?.addEventListener("click", () => { this.returnTo = this.screen === "pause" ? "pause" : "title"; this.show("story"); });
    host.querySelector("#credits")?.addEventListener("click", () => { this.returnTo = "title"; this.show("credits"); });
    host.querySelector("#settings")?.addEventListener("click", () => { this.returnTo = this.screen === "play" || this.screen === "pause" ? "pause" : "title"; this.show("settings"); });
    host.querySelector("#back")?.addEventListener("click", () => this.show(this.returnTo));
    host.querySelector("#resume")?.addEventListener("click", () => this.show("play"));
    host.querySelector("#title")?.addEventListener("click", () => this.show("title"));
    host.querySelector("#keep")?.addEventListener("click", () => { this.sim.endCard = false; this.show("play"); });
    host.querySelector("#show-order")?.addEventListener("click", () => { this.sim.showOrder = true; this.show("play"); });
    host.querySelectorAll<HTMLInputElement>("[data-assist]").forEach((input) => {
      input.addEventListener("change", () => {
        const key = input.dataset.assist as keyof SaveData["settings"]["assists"];
        this.save.settings.assists[key] = input.checked;
        this.sim.assists[key] = input.checked;
        this.persist();
      });
    });
    host.querySelector("#reduced")?.addEventListener("change", (ev) => {
      this.save.settings.reducedMotion = (ev.target as HTMLInputElement).checked;
      this.applyMotion();
      this.persist();
    });
    host.querySelector("#text-size")?.addEventListener("change", (ev) => {
      const value = Number((ev.target as HTMLSelectElement).value);
      this.save.settings.textSize = value === 125 || value === 150 ? value : 100;
      this.applyText();
      this.persist();
    });
    host.querySelector("#sens")?.addEventListener("input", (ev) => {
      this.save.settings.sensitivity = Number((ev.target as HTMLInputElement).value);
      this.persist();
    });
    host.querySelector("#invert")?.addEventListener("change", (ev) => {
      this.save.settings.invertY = (ev.target as HTMLInputElement).checked;
      this.persist();
    });
    host.querySelector("#volume")?.addEventListener("input", (ev) => {
      this.save.settings.volume = Number((ev.target as HTMLInputElement).value);
      this.persist();
    });
    host.querySelectorAll<HTMLButtonElement>("[data-bind]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.bind as keyof Bindings;
        this.listening = action;
        button.textContent = "Press a key";
        this.input.capture = (code) => {
          this.save.settings.bindings = { ...this.save.settings.bindings, [action]: [code] };
          button.textContent = code;
          this.listening = null;
          this.persist();
        };
      });
    });
  }

  private begin(resume: boolean): void {
    if (resume) this.restore();
    else {
      const found = new Set(this.save.foundIds);
      this.sim.found.clear();
      if (this.screen === "confirm") for (const id of found) this.sim.found.add(id);
      this.sim.lit.clear();
      this.sim.woken = false;
      this.sim.archiveOpen = false;
      this.sim.updrafts = false;
      this.sim.thicketCleared = false;
      this.sim.orderStep = 0;
      this.sim.player.x = 0;
      this.sim.player.y = 0;
      this.sim.player.z = 1.2;
      this.sim.player.vx = this.sim.player.vy = this.sim.player.vz = 0;
    }
    this.hold = false;
    this.show("play");
    if (this.stageName) this.pose(this.stageName);
  }

  private restore(): void {
    for (const id of this.save.litBraziers) this.sim.lit.add(id);
    for (const id of this.save.foundIds) this.sim.found.add(id);
    this.sim.thicketCleared = this.save.thicketCleared;
    this.sim.woken = this.save.gatewickWoken;
    this.sim.archiveOpen = this.save.gatewickWoken;
    this.sim.updrafts = ["B1", "B2", "B3", "B4"].every((id) => this.sim.lit.has(id));
    this.sim.respawnBrazier();
  }

  private persist(): void {
    this.save.litBraziers = [...this.sim.lit];
    this.save.foundIds = [...this.sim.found];
    this.save.thicketCleared = this.sim.thicketCleared;
    this.save.gatewickWoken = this.sim.woken;
    this.save.lastBrazier = [...this.sim.lit].at(-1) ?? "BR1";
    saveState(this.save);
  }

  private applyText(): void {
    document.documentElement.style.fontSize = `${this.save.settings.textSize}%`;
  }

  private applyMotion(): void {
    const reduced = this.save.settings.reducedMotion === true
      || (this.save.settings.reducedMotion === null && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setPS1Flags({ snap: !reduced, wobble: !reduced });
  }

  private dismissCard(): void {
    this.sim.card = null;
    this.cardShown = "";
    document.querySelector("#journal")?.remove();
  }

  private syncCard(): void {
    const item = this.sim.card;
    const id = item?.id ?? "";
    if (id === this.cardShown) return;
    this.cardShown = id;
    document.querySelector("#journal")?.remove();
    if (!item) return;
    const wrap = document.createElement("div");
    wrap.id = "journal";
    wrap.innerHTML = journalHTML(item, Boolean(import.meta.env.DEV));
    document.body.appendChild(wrap);
    const keep = wrap.querySelector("#keep-exploring") as HTMLButtonElement;
    keep.addEventListener("click", () => this.dismissCard());
    keep.focus();
    wrap.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") this.dismissCard();
      if (ev.key !== "Tab") return;
      const nodes = [...wrap.querySelectorAll<HTMLElement>("button, a")];
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;
      if (ev.shiftKey && document.activeElement === first) {
        ev.preventDefault();
        last.focus();
      } else if (!ev.shiftKey && document.activeElement === last) {
        ev.preventDefault();
        first.focus();
      }
    });
  }

  private frame = (now: number): void => {
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.fps = dt > 0 ? 1 / dt : 60;
    const playing = this.screen === "play" && !this.listening;
    const sample = this.input.sample(dt, playing, this.save.settings.sensitivity, this.save.settings.invertY);
    if (sample.pause && this.screen === "play" && !this.sim.card) this.show("pause");
    else if (sample.pause && this.screen === "pause") this.show("play");
    if (this.screen === "play" && !this.hold) {
      this.acc += dt;
      const input: PlayInput = this.demo && !this.stageName
        ? demoInput(this.sim)
        : { ...sample, dismiss: false };
      while (this.acc >= 1 / 60) {
        const beforeLit = this.sim.lit.size;
        const beforeFound = this.sim.found.size;
        this.sim.step(1 / 60, input);
        if (this.sim.lit.size !== beforeLit) blip(520, 0.08, 0.03 * this.save.settings.volume);
        if (this.sim.lit.size !== beforeLit || this.sim.found.size !== beforeFound || this.sim.woken) this.persist();
        this.acc -= 1 / 60;
      }
    }
    if (this.sim.endCard && this.screen === "play" && !this.hold) this.show("ending");
    this.syncCard();
    this.hud.update(this.sim);
    if (this.view && this.pipeline && this.rig) {
      this.rig.update(this.sim, [], dt);
      this.view.update(this.sim, dt);
      this.pipeline.noteFrame(dt);
      this.pipeline.render(this.view.scene);
    }
    requestAnimationFrame(this.frame);
  };
}

const app = new App();
