import { STR } from "../content/strings";
import type { CareerItem } from "../content/career";
import { BINDING_LABELS, keyLabel, type Bindings } from "../input/bindings";
import type { Settings } from "../save/storage";

function button(id: string, label: string, autofocus = false): string {
  return `<button type="button" id="${id}" ${autofocus ? "autofocus" : ""}>${label}</button>`;
}

export function titleHTML(saved: boolean): string {
  const primary = saved
    ? `${button("continue", STR.continue, true)}${button("new-journey", STR.newJourney)}`
    : button("play", STR.play, true);
  return `
    <section class="panel">
      <h1>${STR.title}</h1>
      <p class="sub">${STR.subtitle}</p>
      <div class="stack">
        ${primary}
        <a class="text-link" href="/lampkeep/career/">${STR.skip}</a>
        ${button("settings", STR.settings)}
        ${button("story", STR.story)}
        ${button("credits", STR.credits)}
      </div>
    </section>`;
}

export function confirmHTML(): string {
  return `
    <section class="panel">
      <h1>${STR.newJourney}</h1>
      <p>${STR.confirm}</p>
      <div class="row">
        ${button("start-new", STR.start, true)}
        ${button("cancel-new", STR.cancel)}
      </div>
    </section>`;
}

export function storyHTML(): string {
  return `
    <section class="panel">
      <h1>${STR.story}</h1>
      <p>${STR.storyBody}</p>
      ${button("back", STR.back, true)}
    </section>`;
}

export function creditsHTML(): string {
  return `
    <section class="panel">
      <h1>${STR.credits}</h1>
      <ul>
        <li>Hero: KayKit Character Pack: Adventurers 1.0 by Kay Lousberg, CC0.</li>
        <li>Gatewick, valley, braziers, and trees: original art for this page, CC0.</li>
        <li>three.js, MIT.</li>
        <li>Kenney Nature Kit was not vendored: the pack download was not available with a license file during this build.</li>
      </ul>
      ${button("back", STR.back, true)}
    </section>`;
}

export function pauseHTML(onTerrace: boolean): string {
  return `
    <section class="panel">
      <h1>${STR.paused}</h1>
      <div class="stack">
        ${button("resume", STR.resume, true)}
        <a class="text-link" href="/lampkeep/career/">${STR.careerPage}</a>
        ${onTerrace ? button("show-order", STR.showOrder) : ""}
        ${button("settings", STR.settings)}
        ${button("title", STR.titleReturn)}
      </div>
    </section>`;
}

export function endingHTML(): string {
  return `
    <section class="panel">
      <h1>${STR.end}</h1>
      <div class="stack">
        <a class="text-link" href="/lampkeep/career/">${STR.viewCareer}</a>
        ${button("keep", STR.keep, true)}
        ${button("title", STR.titleReturn)}
      </div>
    </section>`;
}

export function settingsHTML(settings: Settings, bindings: Bindings): string {
  const check = (key: keyof Settings["assists"], label: string) =>
    `<label class="check"><input type="checkbox" data-assist="${key}" ${settings.assists[key] ? "checked" : ""}/> ${label}</label>`;
  const rows = BINDING_LABELS.map((row) => {
    const code = bindings[row.action][0] ?? "";
    return `<div class="bind"><span>${row.label}</span><button type="button" data-bind="${row.action}">${keyLabel(code)}</button></div>`;
  }).join("");
  return `
    <section class="panel">
      <h1>${STR.settings}</h1>
      <div class="stack">
        ${check("endlessLamp", "Endless lamp")}
        ${check("stonesStay", "Stones stay")}
        ${check("autoMantle", "Auto-mantle")}
        ${check("gentleThicket", "Gentle thicket")}
        ${check("landmarkNudge", "Landmark nudge")}
        ${check("hintPulses", "Hint pulses")}
        <label class="check"><input id="reduced" type="checkbox" ${settings.reducedMotion ? "checked" : ""}/> Reduced motion</label>
        <label>Text size
          <select id="text-size">
            <option value="100" ${settings.textSize === 100 ? "selected" : ""}>100%</option>
            <option value="125" ${settings.textSize === 125 ? "selected" : ""}>125%</option>
            <option value="150" ${settings.textSize === 150 ? "selected" : ""}>150%</option>
          </select>
        </label>
        <label>Camera sensitivity <input id="sens" type="range" min="0.4" max="2" step="0.1" value="${settings.sensitivity}"/></label>
        <label class="check"><input id="invert" type="checkbox" ${settings.invertY ? "checked" : ""}/> Invert Y</label>
        <label>Audio volume <input id="volume" type="range" min="0" max="1" step="0.05" value="${settings.volume}"/></label>
        ${rows}
        ${button("back", STR.back, true)}
      </div>
    </section>`;
}

export function journalHTML(item: CareerItem, dev: boolean): string {
  const label = item.kind === "career" ? "Career" : "About Spencer";
  const banner = import.meta.env.DEV && dev && item.status === "placeholder"
    ? `<p class="banner">${"PLACE" + "HOLDER"}: ${escapeHtml(item.note || item.topic)}</p>`
    : "";
  return `
    <div class="journal" role="dialog" aria-modal="true" aria-labelledby="journal-title">
      <article class="page">
        <p class="kicker">${STR.journal}</p>
        <h2 id="journal-title">${escapeHtml(item.world.pageTitle)}</h2>
        <p>${escapeHtml(item.world.text)}</p>
      </article>
      <article class="fact">
        <p class="kicker">${label} · ${escapeHtml(item.topic)}</p>
        ${banner}
        <p>${escapeHtml(item.factLine)}</p>
        <div class="row">
          <button type="button" id="keep-exploring">${STR.keep}</button>
          <a class="text-link" href="/lampkeep/career/">${STR.viewCareer}</a>
        </div>
      </article>
    </div>`;
}

function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
