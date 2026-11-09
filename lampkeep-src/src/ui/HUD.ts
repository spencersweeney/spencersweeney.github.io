import { STR } from "../content/strings";
import type { MistRoad } from "../world/MistRoadLevel";

const HEART = `<svg viewBox="0 0 9 8" class="heart" aria-hidden="true"><path d="M1 1h2v1H2v1H1zm5 0h2v2H7V2H6zM2 2h5v1H2zM1 3h7v1H1zM2 4h5v1H2zM3 5h3v1H3zM4 6h1v1H4z"/></svg>`;

export class HUD {
  readonly root: HTMLElement;
  private toastT = 0;

  constructor(parent: HTMLElement) {
    this.root = document.createElement("div");
    this.root.id = "hud";
    this.root.innerHTML = `
      <div class="hud-left">
        <div class="hearts" id="hearts" role="img" aria-label="HP"></div>
        <div class="oil-row">
          <span class="lantern" aria-hidden="true"></span>
          <div class="oil" id="oil" role="img" aria-label="${STR.oil}"></div>
        </div>
      </div>
      <div class="hud-right touch-only">
        <button type="button" id="hud-pause" class="chip">${STR.pause}</button>
        <button type="button" id="hud-lock" class="chip">${STR.lockOn}</button>
      </div>
      <div id="bossbar" hidden>
        <span>${STR.bossName}</span>
        <div class="meter"><div id="bossfill"></div></div>
      </div>
      <p id="prompt" role="status"></p>
      <p id="toast" role="status"></p>
      <div id="reticle" hidden></div>
    `;
    parent.appendChild(this.root);
    const hearts = this.root.querySelector("#hearts")!;
    hearts.innerHTML = HEART + HEART + HEART;
    const oil = this.root.querySelector("#oil")!;
    oil.innerHTML = Array.from({ length: 10 }, () => `<i></i>`).join("");
  }

  bind(onPause: () => void, onLock: () => void): void {
    this.root.querySelector("#hud-pause")!.addEventListener("click", onPause);
    this.root.querySelector("#hud-lock")!.addEventListener("click", onLock);
  }

  toast(text: string): void {
    const el = this.root.querySelector("#toast") as HTMLElement;
    el.textContent = text;
    this.toastT = 2.4;
  }

  update(sim: MistRoad, dt: number): void {
    const hearts = [...this.root.querySelectorAll("#hearts .heart")];
    const hp = sim.player.hp;
    hearts.forEach((node, i) => {
      const svg = node as SVGElement;
      svg.classList.remove("off", "half");
      if (hp >= i + 1) return;
      if (hp >= i + 0.5) svg.classList.add("half");
      else svg.classList.add("off");
    });
    const label = this.root.querySelector("#hearts") as HTMLElement;
    label.setAttribute("aria-label", `${STR.hp} ${hp.toFixed(1)} / 3`);
    const segs = [...this.root.querySelectorAll("#oil i")];
    const filled = Math.round(sim.player.oil / 10);
    segs.forEach((seg, i) => seg.classList.toggle("on", i < filled));
    (this.root.querySelector("#oil") as HTMLElement).setAttribute("aria-label", `${STR.oil} ${Math.round(sim.player.oil)}`);
    const boss = sim.enemies.find((e) => e.kind === "gatewick");
    const bar = this.root.querySelector("#bossbar") as HTMLElement;
    const showBoss = !!boss && boss.alive && sim.bossFight;
    bar.hidden = !showBoss;
    if (boss && showBoss) {
      (this.root.querySelector("#bossfill") as HTMLElement).style.width = `${(boss.hp / boss.maxHp) * 100}%`;
    }
    const prompt = this.root.querySelector("#prompt") as HTMLElement;
    prompt.textContent = sim.promptT > 0 ? sim.prompt : "";
    const reticle = this.root.querySelector("#reticle") as HTMLElement;
    reticle.hidden = !sim.lockId;
    if (this.toastT > 0) {
      this.toastT = Math.max(0, this.toastT - dt);
      if (this.toastT === 0) (this.root.querySelector("#toast") as HTMLElement).textContent = "";
    }
  }
}
