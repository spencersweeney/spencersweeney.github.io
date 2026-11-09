import { STR } from "../content/strings";
import { BINDING_LABELS, keyLabel, type Bindings } from "../input/bindings";
import type { AssistSettings } from "../content/assists";

export interface ScreenModel {
  screen: string;
  canContinue: boolean;
  assistsOn: boolean;
  assists: AssistSettings;
  bindings: Bindings;
  fov: number;
  textureWobble: boolean;
  reduced: "auto" | "on" | "off";
  listening: string | null;
}

function buttons(items: [string, string, boolean?][]): string {
  return items
    .map(([id, label, disabled]) => `<button type="button" id="${id}" ${disabled ? "disabled" : ""}>${label}</button>`)
    .join("");
}

export function screenHTML(m: ScreenModel): string {
  if (m.screen === "play") return "";
  if (m.screen === "title") {
    return panel(`
      <h1>${STR.title}</h1>
      <p class="sub">${STR.subtitle}</p>
      <p class="banner" role="note">${STR.assistsBanner}</p>
      ${m.assistsOn ? "" : `<p class="note">${STR.assistsOffNote}</p>`}
      <div class="stack">
        ${buttons([
          ["begin", STR.begin],
          ["continue", STR.continue, !m.canContinue],
          ["controls", STR.controls],
          ["settings", STR.settings],
          ["about", STR.about],
          ["story", STR.story],
        ])}
      </div>
      ${m.canContinue ? "" : `<p class="note" id="nosave">${STR.noSave}</p>`}
    `);
  }
  if (m.screen === "controls") {
    return panel(`
      <h1>${STR.controls}</h1>
      <div class="card">${STR.controlsCard.map((line) => `<p>${line}</p>`).join("")}</div>
      ${buttons([["back", STR.back]])}
    `);
  }
  if (m.screen === "about") {
    return panel(`
      <h1>${STR.about}</h1>
      ${STR.aboutLines.map((line) => `<p>${line}</p>`).join("")}
      ${buttons([["back", STR.back]])}
    `);
  }
  if (m.screen === "story") {
    return panel(`
      <h1>${STR.story}</h1>
      <p>${STR.storyBody}</p>
      ${buttons([["back", STR.back]])}
    `);
  }
  if (m.screen === "pause") {
    return panel(`
      <h1>${STR.pause}</h1>
      <div class="stack">
        ${buttons([
          ["resume", STR.resume],
          ["controls", STR.controls],
          ["settings", STR.settings],
          ["title-btn", STR.endingTitle],
        ])}
      </div>
    `);
  }
  if (m.screen === "ending") {
    return panel(`
      <h1>${STR.title}</h1>
      <p>${STR.bossClear}</p>
      <p>${STR.ending}</p>
      <div class="row">
        ${buttons([
          ["title-btn", STR.endingTitle],
          ["about", STR.endingAbout],
          ["story", STR.endingStory],
        ])}
      </div>
    `);
  }
  if (m.screen === "dead") {
    return panel(`
      <h1>${STR.death}</h1>
      <div class="row">
        ${buttons([
          ["retry", STR.retry],
          ["title-btn", STR.deathTitle],
        ])}
      </div>
    `);
  }
  if (m.screen === "settings") return settingsPanel(m);
  return "";
}

function panel(inner: string): string {
  return `<div class="panel">${inner}</div>`;
}

function settingsPanel(m: ScreenModel): string {
  const a = m.assists;
  const check = (id: string, label: string, on: boolean) =>
    `<label class="check"><input type="checkbox" id="${id}" ${on ? "checked" : ""}> ${label}</label>`;
  const remap = BINDING_LABELS.map(({ action, label }) => {
    const keys = m.bindings[action].map(keyLabel).join(", ");
    const pending = m.listening === action ? STR.pressKey : keys;
    return `<button type="button" data-bind="${action}">${label}: ${pending}</button>`;
  }).join("");
  return panel(`
    <h1>${STR.settings}</h1>
    ${check("assist-master", STR.settingsLabels.master, a.master)}
    ${check("assist-damage", STR.settingsLabels.damage, a.damageAssist)}
    ${check("assist-dodge", STR.settingsLabels.dodge, a.extraIframes)}
    ${check("assist-soft", STR.settingsLabels.softLock, a.softLock)}
    ${check("assist-recenter", STR.settingsLabels.recenter, a.cameraRecenter)}
    ${check("assist-prompts", STR.settingsLabels.prompts, a.showPrompts)}
    ${check("assist-slow", STR.settingsLabels.slow, a.slowCombat)}
    <p class="note">${STR.slowHint}</p>
    <label class="field" for="telegraph">${STR.settingsLabels.telegraph}
      <select id="telegraph">
        <option value="amber" ${a.telegraphStyle === "amber" ? "selected" : ""}>${STR.telegraphStyles.amber}</option>
        <option value="high" ${a.telegraphStyle === "high" ? "selected" : ""}>${STR.telegraphStyles.high}</option>
        <option value="colorblind" ${a.telegraphStyle === "colorblind" ? "selected" : ""}>${STR.telegraphStyles.colorblind}</option>
      </select>
    </label>
    ${check("wobble", STR.settingsLabels.wobble, m.textureWobble)}
    <label class="field" for="reduced">${STR.settingsLabels.reduced}
      <select id="reduced">
        <option value="auto" ${m.reduced === "auto" ? "selected" : ""}>${STR.reducedModes.auto}</option>
        <option value="on" ${m.reduced === "on" ? "selected" : ""}>${STR.reducedModes.on}</option>
        <option value="off" ${m.reduced === "off" ? "selected" : ""}>${STR.reducedModes.off}</option>
      </select>
    </label>
    <label class="field" for="fov">${STR.fovValue(m.fov)}
      <input id="fov" type="range" min="50" max="75" step="1" value="${m.fov}">
    </label>
    <h2>${STR.settingsLabels.remap}</h2>
    <div class="remap">${remap}</div>
    <div class="row">
      ${buttons([
        ["reset", STR.settingsLabels.reset],
        ["back", STR.settingsLabels.back],
      ])}
    </div>
  `);
}
