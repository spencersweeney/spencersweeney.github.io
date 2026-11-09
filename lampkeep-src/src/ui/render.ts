import { bellName, STRINGS } from "../game/content";
import {
  canClose,
  canInvite,
  canLight,
  canMediate,
  canRefuse,
  canStage,
  contentionOpen,
  freeInviteAvailable,
  lightCost,
  occupants,
} from "../game/engine";
import { canRingDawn } from "../game/outcomes";
import { boardSummary } from "../game/summary";
import {
  GUEST_ORDER,
  NON_HOLLOW,
  PROP_ORDER,
  ROOM_ORDER,
  type GuestId,
  type NightState,
  type PropId,
  type RoomId,
} from "../game/types";
import type { Assists, Meta } from "../game/save";
import { esc, fill } from "./format";

export type Modal =
  | null
  | "guest"
  | "mediate"
  | "event"
  | "dawn"
  | "about"
  | "settings"
  | "pause"
  | "rules"
  | "abandon";

export interface ViewModel {
  screen: "title" | "intro" | "play" | "epilogue";
  modal: Modal;
  night: NightState | null;
  canContinue: boolean;
  assists: Assists;
  meta: Meta;
  selectedRoom: RoomId | null;
  selectedProps: PropId[];
  selectedGuest: GuestId | null;
  guestSheet: GuestId | null;
  toast: string | null;
  log: string[];
  moreOpen: boolean;
  tip: { id: string; text: string } | null;
}

function btn(
  label: string,
  act: string,
  focus: string,
  extra = "",
): string {
  return `<button type="button" data-act="${act}" data-focus="${focus}" ${extra}>${label}</button>`;
}

function costLabel(kind: string, show: boolean): string {
  if (!show) return "";
  return `<small class="cost">${esc(kind)}</small>`;
}

export function activeTip(state: NightState, meta: Meta): { id: string; text: string } | null {
  if (meta.nightsFinished > 0) return null;
  const map = state.rooms.map_room;
  const mira = state.guests.mira;
  let tip: { id: string; text: string } | null = null;
  if (state.bell === 1 && map.lamp === "unlit") tip = { id: "bell1", text: STRINGS.tutorial.bell1 };
  else if (mira.status === "waiting" && map.lamp === "lit") tip = { id: "afterLit", text: STRINGS.tutorial.afterLit };
  else if (mira.status === "waiting" && map.lamp === "staged") tip = { id: "afterStaged", text: STRINGS.tutorial.afterStaged };
  else if (
    state.bell >= 2 &&
    state.guests.cadence.status === "waiting" &&
    state.guests.bram.status === "waiting"
  ) {
    tip = { id: "bell2", text: STRINGS.tutorial.bell2 };
  } else if (state.guests.hollow.status === "waiting") {
    tip = { id: "bell4", text: STRINGS.tutorial.bell4 };
  } else if (
    NON_HOLLOW.every((id) => {
      const status = state.guests[id].status;
      return status === "leave_ready" || status === "departed_complete";
    })
  ) {
    tip = { id: "dawn", text: STRINGS.tutorial.dawn };
  }
  if (!tip || meta.dismissedTipId === tip.id) return null;
  return tip;
}

function roomClass(state: NightState, id: RoomId, selected: RoomId | null, highlight: boolean): string {
  const classes = ["room"];
  if (selected === id) classes.push("is-selected");
  const room = state.rooms[id];
  if (room.seal === "soft") classes.push("line-lavender");
  else if (room.seal === "harsh") classes.push("line-danger");
  else if (room.lamp === "staged" || room.lamp === "leave_ready") classes.push("line-moss");
  else if (room.lamp === "occupied" || (id === "hearth_hall" && contentionOpen(state))) classes.push("is-legal");
  if (highlight && canLight(state, id)) classes.push("is-legal");
  return classes.join(" ");
}

function dotClass(state: NightState, id: RoomId): string {
  if (id === "foyer") return "dot always";
  const room = state.rooms[id];
  if (room.seal === "soft") return "dot sealed_soft";
  if (room.seal === "harsh") return "dot sealed_harsh";
  if (id === "hearth_hall" && contentionOpen(state)) return "dot contested";
  return `dot ${state.rooms[id].lamp}`;
}

function roomStateText(state: NightState, id: RoomId): string {
  const room = state.rooms[id];
  if (id === "foyer") return STRINGS.states.always_lit;
  if (room.seal === "soft") return STRINGS.states.sealed_soft;
  if (room.seal === "harsh") return STRINGS.states.sealed_harsh;
  if (id === "hearth_hall" && contentionOpen(state) && occupants(state, id).length === 0) {
    return `${STRINGS.states[room.lamp]} — ${STRINGS.states.contested}`;
  }
  const people = occupants(state, id).map((guest) => STRINGS.guests[guest].name);
  if (people.length) return `${STRINGS.states[room.lamp]} — ${people.join(", ")}`;
  if (room.props.length) {
    const names = room.props.map((prop) => STRINGS.props[prop]).join(", ");
    return `${STRINGS.states[room.lamp]} — ${names}`;
  }
  return `${STRINGS.states[room.lamp]} — ${STRINGS.states.empty}`;
}

function roomHint(state: NightState, id: RoomId): string {
  if (id === "foyer") return STRINGS.buttons.about;
  if (id === "cellar" && !state.rooms.cellar.seal) return STRINGS.actions.closeSoft;
  if (id === "hearth_hall" && contentionOpen(state)) return STRINGS.actions.mediate;
  if (canLight(state, id)) return `${STRINGS.actions.light} · ${lightCost(state)}`;
  const waiting = GUEST_ORDER.find((guest) => canInvite(state, guest, id));
  if (waiting) return STRINGS.actions.invite;
  return "";
}

function roomLabel(state: NightState, id: RoomId): string {
  const bits = [STRINGS.rooms[id], roomStateText(state, id)];
  if (canLight(state, id)) {
    bits.push(`${STRINGS.actions.light}. ${lightCost(state) === 1 ? STRINGS.costs.oil1 : STRINGS.costs.oil2}`);
  }
  return bits.join(". ");
}

function guestStatus(state: NightState, id: GuestId): string {
  const guest = state.guests[id];
  if (guest.status === "absent") return STRINGS.status.soon;
  return STRINGS.status[guest.status];
}

function actionButton(
  name: string,
  detail: string,
  act: string,
  focus: string,
  legal: boolean,
  highlight: boolean,
  showCosts: boolean,
): string {
  const cls = highlight && legal ? "is-legal" : "";
  return `<button type="button" class="${cls}" data-act="${act}" data-focus="${focus}" ${legal ? "" : "aria-disabled=\"true\""}><strong>${esc(name)}</strong>${costLabel(detail, showCosts)}</button>`;
}

function dialog(title: string, body: string, dismiss: boolean): string {
  const back = dismiss ? `data-act="backdrop"` : "";
  return `<div class="modal-back" ${back}><div class="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabindex="0"><h2 id="dialog-title">${esc(title)}</h2>${body}</div></div>`;
}

function aboutBody(): string {
  return `<p>${esc(STRINGS.about.p1)}</p><p>${esc(STRINGS.about.p2)}</p><p>${esc(STRINGS.about.p3.split("solar-system")[0])}<a href="/" data-focus="space-link">${esc("solar-system / space page")}</a>${esc(STRINGS.about.p3.split("space page")[1] ?? "")}</p>${btn(esc(STRINGS.buttons.close), "close-modal", "about-close", "data-autofocus")}`;
}

function settingsBody(model: ViewModel): string {
  const a = model.assists;
  const toggle = (key: keyof Assists, label: string) => {
    const on = Boolean(a[key]);
    return `<button type="button" class="toggle" data-act="toggle" data-assist="${key}" data-focus="assist-${key}" aria-pressed="${on}"><span class="switch" aria-hidden="true"></span>${esc(label)}</button>`;
  };
  const motion =
    a.reducedMotion === true ? "on" : a.reducedMotion === false ? "off" : "system";
  return `<p>${esc(STRINGS.settings.nextNight)}</p>
    ${toggle("relaxedOil", STRINGS.settings.relaxedOil)}
    ${toggle("showCosts", STRINGS.settings.showCosts)}
    ${toggle("highlightLegal", STRINGS.settings.highlightLegal)}
    ${toggle("hostHints", STRINGS.settings.hostHints)}
    ${toggle("propRefresh", STRINGS.settings.propRefresh)}
    <label class="stack">${esc(STRINGS.settings.reducedMotion)}
      <select data-act="motion" data-focus="assist-motion" aria-label="${esc(STRINGS.settings.reducedMotion)}">
        <option value="system" ${motion === "system" ? "selected" : ""}>${esc(STRINGS.settings.motionSystem)}</option>
        <option value="on" ${motion === "on" ? "selected" : ""}>${esc(STRINGS.settings.motionOn)}</option>
        <option value="off" ${motion === "off" ? "selected" : ""}>${esc(STRINGS.settings.motionOff)}</option>
      </select>
    </label>
    <div class="row">
      ${btn(esc(STRINGS.settings.done), "close-modal", "settings-done", "data-autofocus")}
      ${model.night && model.night.phase === "play" ? btn(esc(STRINGS.buttons.abandon), "abandon", "abandon-open") : ""}
    </div>`;
}

function guestBody(state: NightState, id: GuestId, room: RoomId | null): string {
  const copy = STRINGS.guests[id];
  const can = room ? canInvite(state, id, room) : false;
  return `<p class="sub">${esc(STRINGS.guestCard)} · ${esc(copy.role)}</p>
    <div class="guest-layout">
      <div class="plate lamp-glow" role="img" aria-label="${esc(copy.name)}"></div>
      <div class="stack">
        <section><h3>${esc(STRINGS.needTonight)}</h3><p>${esc(copy.need)}</p></section>
        <section><h3>${esc(STRINGS.quirk)}</h3><p>${esc(copy.quirk)}</p></section>
        <section><h3>${esc(STRINGS.hook)}</h3><p>${esc(copy.hook)}</p></section>
        <blockquote class="quote"><h3>${esc(STRINGS.sample)}</h3><p>"${esc(copy.interaction)}"</p></blockquote>
        <div class="row">
          ${id !== "hollow" ? `<button type="button" data-act="sheet-invite" data-focus="sheet-invite" ${can ? "data-autofocus" : "aria-disabled=\"true\""}>${esc(STRINGS.actions.invite)}</button>` : `<button type="button" data-act="refuse" data-focus="sheet-refuse" ${canRefuse(state) ? "data-autofocus" : "aria-disabled=\"true\""}>${esc(STRINGS.actions.refuse)}</button>`}
          ${btn(esc(STRINGS.buttons.close), "close-modal", "guest-close", id === "hollow" && !canRefuse(state) ? "data-autofocus" : can ? "" : "data-autofocus")}
        </div>
      </div>
    </div>`;
}

function modalFor(model: ViewModel): string {
  const state = model.night;
  if (model.modal === "about") return dialog(STRINGS.about.title, aboutBody(), true);
  if (model.modal === "settings") return dialog(STRINGS.settings.title, settingsBody(model), true);
  if (model.modal === "rules") {
    return dialog(
      STRINGS.buttons.rules,
      `<p>${esc(STRINGS.rules.body)}</p><p>${esc(STRINGS.rules.keys)}</p>${btn(esc(STRINGS.buttons.close), "close-modal", "rules-close", "data-autofocus")}`,
      true,
    );
  }
  if (model.modal === "pause") {
    return dialog(
      STRINGS.pause.title,
      `<div class="row">${btn(esc(STRINGS.buttons.resume), "resume", "resume", "data-autofocus")}${btn(esc(STRINGS.buttons.settings), "settings", "pause-settings")}${btn(esc(STRINGS.buttons.titleScreen), "title", "pause-title")}</div>`,
      true,
    );
  }
  if (model.modal === "abandon") {
    return dialog(
      STRINGS.buttons.abandon,
      `<p>${esc(STRINGS.settings.abandonConfirm)}</p><div class="row">${btn(esc(STRINGS.buttons.abandon), "abandon-yes", "abandon-yes", "data-autofocus")}${btn(esc(STRINGS.mediate.cancel), "abandon-no", "abandon-no")}</div>`,
      true,
    );
  }
  if (!state) return "";
  if (model.modal === "guest" && model.guestSheet) {
    return dialog(STRINGS.guests[model.guestSheet].name, guestBody(state, model.guestSheet, model.selectedRoom), true);
  }
  if (model.modal === "mediate") {
    return dialog(
      STRINGS.mediate.title,
      `<p>${esc(STRINGS.mediate.body)}</p>
        <div class="stack">
          <button type="button" class="choice" data-act="mediate-cadence" data-focus="med-cadence" data-autofocus><strong>${esc(STRINGS.mediate.cadence)}</strong><small>${esc(STRINGS.mediate.cadenceDetail)}</small></button>
          <button type="button" class="choice" data-act="mediate-bram" data-focus="med-bram"><strong>${esc(STRINGS.mediate.bram)}</strong><small>${esc(STRINGS.mediate.bramDetail)}</small></button>
          <button type="button" class="choice" data-act="mediate-share" data-focus="med-share"><strong>${esc(STRINGS.mediate.share)}</strong><small>${esc(STRINGS.mediate.shareDetail)}</small></button>
          ${btn(esc(STRINGS.mediate.cancel), "close-modal", "med-cancel")}
        </div>`,
      true,
    );
  }
  if (model.modal === "event" && state.pendingEventId) {
    const id = state.pendingEventId;
    if (id === "roof_drip") {
      const copy = STRINGS.events.roof_drip;
      const controls = `<div class="row">${btn(esc(copy.spend), "event-spend", "event-spend", "data-autofocus")}${btn(esc(copy.drip), "event-drip", "event-drip")}</div>`;
      return dialog(copy.title, `<p>${esc(copy.body)}</p><p>${esc(copy.effect)}</p>${controls}`, false);
    }
    if (id === "oil_gift") {
      const copy = STRINGS.events.oil_gift;
      return dialog(copy.title, `<p>${esc(copy.body)}</p><p>${esc(copy.effect)}</p>${btn(esc(copy.accept), "event-accept", "event-accept", "data-autofocus")}`, false);
    }
    const copy = id === "double_knock" ? STRINGS.events.double_knock : STRINGS.events.steady_wick;
    return dialog(copy.title, `<p>${esc(copy.body)}</p><p>${esc(copy.effect)}</p>${btn(esc(copy.continue), "event-continue", "event-continue", "data-autofocus")}`, false);
  }
  if (model.modal === "dawn") {
    return dialog(
      STRINGS.confirm.title,
      `<p>${esc(STRINGS.confirm.body)}</p><div class="row">${btn(esc(STRINGS.buttons.confirmDawn), "dawn-yes", "dawn-yes", "data-autofocus")}${btn(esc(STRINGS.mediate.cancel), "dawn-no", "dawn-no")}</div>`,
      true,
    );
  }
  return "";
}

function header(state: NightState | null, showUndo: boolean): string {
  const oil = state ? state.oil : 0;
  const max = state ? state.startOil : 12;
  const pct = Math.max(0, Math.min(100, (oil / Math.max(1, max)) * 100));
  return `<a class="skip" href="#main">${esc(STRINGS.aria.skip)}</a>
    <header class="top">
      <div>
        <p class="kicker">${esc(STRINGS.nightName)}</p>
        <h1>${esc(STRINGS.title)}</h1>
      </div>
      <div class="status-cluster">
        <div>
          <p class="bell" data-bell>${state ? esc(fill(STRINGS.header.bellOf, { bell: state.bell })) + " · " + esc(bellName(state.bell)) : ""}</p>
          <div class="oil">
            <span>${esc(STRINGS.header.oil)}</span>
            <div class="oil-track" aria-hidden="true"><div class="oil-fill" style="width:${pct}%"></div></div>
            <span>${state ? esc(fill(STRINGS.header.oilValue, { oil, max })) : ""}</span>
          </div>
          <p>${state ? esc(fill(STRINGS.header.strain, { n: state.strain })) : ""}</p>
        </div>
        <div class="header-actions">
        ${btn(esc(STRINGS.buttons.rules), "rules", "rules")}
        ${btn(esc(STRINGS.buttons.about), "about", "about")}
        ${btn(esc(STRINGS.buttons.settings), "settings", "settings")}
        ${showUndo ? btn(esc(STRINGS.actions.undo), "undo", "undo", "class=\"only-desktop\"") : ""}
        </div>
      </div>
    </header>`;
}

function playScreen(model: ViewModel): string {
  const state = model.night!;
  const show = model.assists.showCosts;
  const highlight = model.assists.highlightLegal;
  const lightDetail = state.steadyWick ? STRINGS.costs.oil1 : STRINGS.costs.oil2;
  const rooms = ROOM_ORDER.map((id) => {
    const act = id === "foyer" ? "about" : "select-room";
    return `<li><button type="button" class="${roomClass(state, id, model.selectedRoom, highlight)}" data-act="${act}" data-room="${id}" data-focus="room-${id}" aria-pressed="${model.selectedRoom === id}" aria-label="${esc(roomLabel(state, id))}"><span class="${dotClass(state, id)}" aria-hidden="true"></span><span><span class="room-name">${esc(STRINGS.rooms[id])}</span><span class="room-state">${esc(roomStateText(state, id))}</span></span><span class="room-hint">${esc(roomHint(state, id))}</span></button></li>`;
  }).join("");
  const guests = GUEST_ORDER.map((id) => {
    const copy = STRINGS.guests[id];
    return `<li><button type="button" class="guest ${model.selectedGuest === id ? "is-selected" : ""}" data-act="select-guest" data-guest="${id}" data-focus="guest-${id}" aria-pressed="${model.selectedGuest === id}"><span><span class="g-name">${esc(copy.name)}</span><span class="g-role">${esc(copy.role)} · ${esc(copy.shortNeed)}</span></span><span>${esc(guestStatus(state, id))}</span></button></li>`;
  }).join("");
  const waiting = GUEST_ORDER.filter((id) => state.guests[id].status === "waiting");
  const props = PROP_ORDER.map((id) => {
    const ready = state.props[id].location === "tray";
    const on = model.selectedProps.includes(id);
    return `<li><button type="button" class="prop ${on ? "is-selected" : ""}" data-act="select-prop" data-prop="${id}" data-focus="prop-${id}" aria-pressed="${on}" ${ready ? "" : "aria-disabled=\"true\""}><span class="prop-name">${esc(STRINGS.props[id])}</span><small>${esc(ready ? STRINGS.propStates.ready : STRINGS.propStates.spent)}</small></button></li>`;
  }).join("");
  const inviteLegal = model.selectedGuest && model.selectedRoom
    ? canInvite(state, model.selectedGuest, model.selectedRoom)
    : false;
  const stageLegal = model.selectedRoom ? canStage(state, model.selectedRoom) && model.selectedProps.length > 0 : false;
  const settled = NON_HOLLOW.filter((id) => {
    const status = state.guests[id].status;
    return status === "resting" || status === "leave_ready" || status === "departed_complete";
  }).length;
  const ready = NON_HOLLOW.filter((id) => {
    const status = state.guests[id].status;
    return status === "leave_ready" || status === "departed_complete";
  }).length;
  const banners = [
    model.tip ? `<div class="banner"><p>${esc(model.tip.text)}</p>${btn(esc(STRINGS.buttons.dismiss), "dismiss-tip", "dismiss-tip")}</div>` : "",
    freeInviteAvailable(state) ? `<p class="banner">${esc(STRINGS.freeInvite)}</p>` : "",
    state.hostHint ? `<p class="banner">${esc(STRINGS.notices.hint)}</p>` : "",
    model.toast ? `<p class="toast" role="status">${esc(model.toast)}</p>` : "",
  ].join("");
  const log = model.log.length
    ? `<ul class="log">${model.log.map((line) => `<li>${esc(line)}</li>`).join("")}</ul>`
    : "";
  return `${header(state, true)}
    <main id="main" tabindex="-1">
      <p class="sr-only" id="board-summary">${esc(boardSummary(state))}</p>
      ${banners}
      <div class="board">
        <section class="panel" aria-labelledby="rooms-title">
          <h2 id="rooms-title">${esc(STRINGS.roomsTitle)}</h2>
          <p class="hint">${esc(STRINGS.roomsHint)}</p>
          <ul class="rooms" role="list" aria-label="${esc(STRINGS.aria.roomList)}">${rooms}</ul>
        </section>
        <div class="stack">
          <section class="panel" aria-labelledby="guests-title">
            <h2 id="guests-title">${esc(STRINGS.guestsTitle)}</h2>
            <ul class="guest-list" role="list" aria-label="${esc(STRINGS.aria.guestList)}">${guests}</ul>
            <h3>${esc(STRINGS.waitingTitle)}</h3>
            <p>${waiting.length ? esc(waiting.map((id) => STRINGS.guests[id].name).join(", ")) : esc(STRINGS.noWaiting)}</p>
          </section>
          <section class="panel" aria-labelledby="props-title">
            <h2 id="props-title">${esc(STRINGS.propsTitle)}</h2>
            <ul class="props" aria-label="${esc(STRINGS.aria.propList)}">${props}</ul>
          </section>
          <section class="panel only-desktop" aria-labelledby="actions-title">
            <h2 id="actions-title">${esc(STRINGS.actionsTitle)}</h2>
            <p>${esc(fill(STRINGS.actionsLeft, { n: state.actionsLeft }))}</p>
            <div class="actions" aria-label="${esc(STRINGS.aria.actions)}">
              ${actionButton(STRINGS.actions.light, lightDetail, "light", "act-light", Boolean(model.selectedRoom && canLight(state, model.selectedRoom)), highlight, show)}
              ${actionButton(STRINGS.actions.stage, STRINGS.costs.usesProp, "stage", "act-stage", stageLegal, highlight, show)}
              ${actionButton(STRINGS.actions.invite, STRINGS.costs.free, "invite", "act-invite", inviteLegal, highlight, show)}
              ${actionButton(STRINGS.actions.mediate, STRINGS.costs.free, "mediate", "act-mediate", canMediate(state), highlight, show)}
              ${actionButton(STRINGS.actions.refuse, STRINGS.costs.strain1, "refuse", "act-refuse", canRefuse(state), highlight, show)}
              ${actionButton(STRINGS.actions.closeSoft, STRINGS.costs.strain1, "close-soft", "act-close-soft", canClose(state), highlight, show)}
              ${actionButton(STRINGS.actions.closeHarsh, STRINGS.costs.strain2, "close-harsh", "act-close-harsh", canClose(state), highlight, show)}
              ${actionButton(STRINGS.actions.endBell, STRINGS.costs.free, "end", "act-end", !state.pendingEventId && !state.awaitingDawnConfirm, highlight, show)}
            </div>
          </section>
        </div>
      </div>
      ${log}
      <div class="dock only-mobile" aria-label="${esc(STRINGS.aria.actions)}">
        ${actionButton(STRINGS.actions.light, lightDetail, "light", "dock-light", Boolean(model.selectedRoom && canLight(state, model.selectedRoom)), highlight, show)}
        ${actionButton(STRINGS.actions.stage, STRINGS.costs.usesProp, "stage", "dock-stage", stageLegal, highlight, show)}
        ${actionButton(STRINGS.actions.mediate, STRINGS.costs.free, "mediate", "dock-mediate", canMediate(state), highlight, show)}
        ${actionButton(STRINGS.actions.undo, "", "undo", "dock-undo", true, false, false)}
      </div>
      <button type="button" class="only-mobile" data-act="more" data-focus="more" aria-expanded="${model.moreOpen}">${esc(STRINGS.buttons.more)}</button>
      <div class="more-panel only-mobile" ${model.moreOpen ? "" : "hidden"}>
        ${actionButton(STRINGS.actions.invite, STRINGS.costs.free, "invite", "more-invite", inviteLegal, highlight, show)}
        ${actionButton(STRINGS.actions.refuse, STRINGS.costs.strain1, "refuse", "more-refuse", canRefuse(state), highlight, show)}
        ${actionButton(STRINGS.actions.closeSoft, STRINGS.costs.strain1, "close-soft", "more-close-soft", canClose(state), highlight, show)}
        ${actionButton(STRINGS.actions.closeHarsh, STRINGS.costs.strain2, "close-harsh", "more-close-harsh", canClose(state), highlight, show)}
        ${actionButton(STRINGS.actions.endBell, STRINGS.costs.free, "end", "more-end", true, highlight, show)}
        ${actionButton(STRINGS.actions.ringDawn, STRINGS.costs.free, "dawn", "more-dawn", canRingDawn(state), highlight, show)}
        ${btn(esc(STRINGS.buttons.rules), "rules", "more-rules")}
        ${btn(esc(STRINGS.buttons.about), "about", "more-about")}
        ${btn(esc(STRINGS.buttons.settings), "settings", "more-settings")}
      </div>
    </main>
    <footer class="footer">
      <div class="stack dawn-col only-desktop">
        ${btn(esc(STRINGS.actions.endBell), "end", "foot-end")}
        <button type="button" class="dawn ${highlight && canRingDawn(state) ? "lamp-glow" : ""}" data-act="dawn" data-focus="dawn" ${canRingDawn(state) ? "" : "aria-disabled=\"true\""}>${esc(STRINGS.actions.ringDawn)}<small>${esc(canRingDawn(state) ? STRINGS.dawnReady : STRINGS.dawnHint)}</small></button>
      </div>
      <section class="panel goal-card">
        <h2>${esc(STRINGS.goalTitle)}</h2>
        <p>${esc(STRINGS.goal)}</p>
        <p class="hint">${esc(fill(STRINGS.goalStats, { settled, total: 3, ready, strain: state.strain }))}</p>
        <div class="row only-desktop">
          ${btn(esc(STRINGS.buttons.about), "about", "foot-about")}
          ${btn(esc(STRINGS.buttons.settings), "settings", "foot-settings")}
        </div>
      </section>
    </footer>`;
}

function leaveCard(id: GuestId, state: NightState): string {
  const done =
    state.guests[id].status === "leave_ready" || state.guests[id].status === "departed_complete";
  let line = STRINGS.epilogue.hollowLingered;
  if (id === "mira") line = done ? STRINGS.epilogue.miraComplete : STRINGS.epilogue.miraUnfinished;
  if (id === "cadence") line = done ? STRINGS.epilogue.cadenceComplete : STRINGS.epilogue.cadenceUnfinished;
  if (id === "bram") line = done ? STRINGS.epilogue.bramComplete : STRINGS.epilogue.bramUnfinished;
  if (id === "hollow" && state.guests.hollow.status === "departed_unfinished") line = STRINGS.epilogue.hollowKind;
  return `<article class="leave ${id}"><h3>${esc(STRINGS.guests[id].name)}</h3><p>${esc(line)}</p></article>`;
}

function epilogueScreen(model: ViewModel): string {
  const state = model.night!;
  const outcome = state.outcome ?? "warm";
  const title = STRINGS.epilogue[`${outcome}Title` as "perfectTitle"];
  const body = STRINGS.epilogue[`${outcome}Body` as "perfectBody"];
  return `${header(state, false)}
    <main id="main" class="stack" tabindex="-1">
      <section class="panel">
        <p class="kicker">${esc(STRINGS.epilogue.kicker)}</p>
        <div class="epi-top">
          <div class="plate" role="img" aria-label="${esc(STRINGS.epilogue.kicker)}"></div>
          <div class="plate lamp-glow" role="img" aria-label="${esc(STRINGS.epilogue.lanternTitle)}"></div>
        </div>
      </section>
      <section>
        <h2>${esc(STRINGS.epilogue.leaveTitle)}</h2>
        <div class="leave-grid">${GUEST_ORDER.map((id) => leaveCard(id, state)).join("")}</div>
      </section>
      <div class="board">
        <section class="panel" data-outcome="${outcome}">
          <h2>${esc(STRINGS.epilogue.result)}</h2>
          <p class="outcome">${esc(title)}</p>
          <p>${esc(body)}</p>
        </section>
        <section class="panel">
          <h2>${esc(STRINGS.epilogue.lanternTitle)}</h2>
          <p>${esc(STRINGS.epilogue.lanternBody)}</p>
          <div class="row">
            ${btn(esc(STRINGS.buttons.about), "about", "epi-about")}
            ${btn(esc(STRINGS.buttons.newNight), "new", "epi-new")}
            ${btn(esc(STRINGS.buttons.titleScreen), "title", "epi-title")}
          </div>
        </section>
      </div>
      ${model.toast ? `<p class="toast">${esc(model.toast)}</p>` : ""}
    </main>`;
}

function titleScreen(model: ViewModel): string {
  return `<a class="skip" href="#main">${esc(STRINGS.aria.skip)}</a>
    <main id="main" class="center" tabindex="-1">
      <div class="card">
        <div class="plate lamp-glow" role="img" aria-label="${esc(STRINGS.title)}"></div>
        <h1>${esc(STRINGS.title)}</h1>
        <p>${esc(STRINGS.subtitle)}</p>
        <div class="row">
          ${btn(esc(STRINGS.buttons.newNight), "new", "new-night")}
          ${model.canContinue ? btn(esc(STRINGS.buttons.continue), "continue", "continue") : ""}
          ${btn(esc(STRINGS.buttons.about), "about", "title-about")}
          ${btn(esc(STRINGS.buttons.settings), "settings", "title-settings")}
        </div>
        <p><a href="/">${esc(STRINGS.buttons.spaceSite)}</a></p>
      </div>
    </main>`;
}

function introScreen(): string {
  return `<main id="main" class="center" tabindex="-1">
      <div class="card">
        <h1>${esc(STRINGS.title)}</h1>
        <p>${esc(STRINGS.intro.body)}</p>
        <p>${esc(STRINGS.intro.tip)}</p>
        <div class="row">
          ${btn(esc(STRINGS.buttons.begin), "begin", "begin", "data-autofocus")}
          ${btn(esc(STRINGS.buttons.skip), "skip", "skip")}
        </div>
      </div>
    </main>`;
}

export function renderApp(model: ViewModel): string {
  const screen =
    model.screen === "title"
      ? titleScreen(model)
      : model.screen === "intro"
        ? introScreen()
        : model.screen === "epilogue" && model.night
          ? epilogueScreen(model)
          : model.night
            ? `<div class="shell">${playScreen(model)}</div>`
            : titleScreen(model);
  const shell = model.screen === "play" ? screen : `<div class="shell">${screen}</div>`;
  return `${shell}${modalFor(model)}`;
}
