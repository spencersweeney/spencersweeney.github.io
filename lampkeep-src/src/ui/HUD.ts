import { STR } from "../content/strings";
import { BRAZIERS } from "../world/level";
import type { Valley } from "../world/valley";

export class HUD {
  readonly root: HTMLElement;

  constructor(parent: HTMLElement) {
    this.root = document.createElement("div");
    this.root.id = "hud";
    this.root.hidden = true;
    this.root.innerHTML = `
      <div class="hud-top">
        <div class="lamp-wrap">
          <span id="lamp-label">${STR.lamp}</span>
          <div class="lampbar" id="lampbar" role="meter" aria-label="${STR.lamp}" aria-valuemin="0" aria-valuemax="100">
            <div id="lampfill"></div>
          </div>
        </div>
        <p id="discoveries"></p>
        <p id="braziers" hidden></p>
        <p id="pips" hidden></p>
        <button type="button" id="hud-pause" class="chip">${STR.pause}</button>
      </div>
      <p id="prompt" role="status"></p>
      <p id="toast" role="status"></p>
    `;
    parent.appendChild(this.root);
  }

  bind(onPause: () => void): void {
    this.root.querySelector("#hud-pause")!.addEventListener("click", onPause);
  }

  update(sim: Valley): void {
    const fill = this.root.querySelector("#lampfill") as HTMLElement;
    fill.style.width = `${Math.max(0, Math.min(100, sim.lamp))}%`;
    const meter = this.root.querySelector("#lampbar") as HTMLElement;
    meter.setAttribute("aria-valuenow", String(Math.round(sim.lamp)));
    const discoveries = this.root.querySelector("#discoveries") as HTMLElement;
    discoveries.textContent = `${STR.discoveries} ${sim.discoveriesFound} / ${sim.discoveryTotal}`;
    const terrace = BRAZIERS.filter((b) => b.terrace && sim.lit.has(b.id)).length;
    const onTerrace = sim.player.z > 170 && sim.player.y > 30;
    const braziers = this.root.querySelector("#braziers") as HTMLElement;
    braziers.hidden = !onTerrace;
    braziers.textContent = `${STR.braziers} ${terrace} / 4`;
    const pips = this.root.querySelector("#pips") as HTMLElement;
    pips.hidden = !sim.inThicket;
    pips.textContent = `${STR.light} ${"●".repeat(sim.thicketPips)}${"○".repeat(Math.max(0, 3 - sim.thicketPips))}`;
    (this.root.querySelector("#prompt") as HTMLElement).textContent = sim.card ? "" : sim.prompt;
    (this.root.querySelector("#toast") as HTMLElement).textContent = sim.toastT > 0 ? sim.toast : "";
  }
}
