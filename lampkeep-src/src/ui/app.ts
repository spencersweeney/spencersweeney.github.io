import { bellName, NIGHT, STRINGS } from "../game/content";
import { applyAction, createNight, freeInviteAvailable } from "../game/engine";
import { canRingDawn } from "../game/outcomes";
import {
  clearNight,
  defaultAssists,
  defaultMeta,
  loadSave,
  nightInProgress,
  writeSave,
  type Assists,
  type Meta,
  type SaveData,
  type ScreenId,
} from "../game/save";
import { popSnapshot, pushSnapshot, snapshotForUndo } from "../game/undo";
import {
  GUEST_ORDER,
  ROOM_ORDER,
  type Action,
  type GuestId,
  type NightState,
  type Notice,
  type PropId,
  type RoomId,
} from "../game/types";
import { fill } from "./format";
import { activeTip, renderApp, type Modal, type ViewModel } from "./render";

interface App {
  screen: ScreenId;
  modal: Modal;
  night: NightState | null;
  undo: NightState[];
  assists: Assists;
  meta: Meta;
  selectedRoom: RoomId | null;
  selectedProps: PropId[];
  selectedGuest: GuestId | null;
  guestSheet: GuestId | null;
  toast: string | null;
  log: string[];
  moreOpen: boolean;
  focusDialog: boolean;
}

const app: App = {
  screen: "title",
  modal: null,
  night: null,
  undo: [],
  assists: defaultAssists(),
  meta: defaultMeta(),
  selectedRoom: null,
  selectedProps: [],
  selectedGuest: null,
  guestSheet: null,
  toast: null,
  log: [],
  moreOpen: false,
  focusDialog: false,
};

let root: HTMLElement;

function model(): ViewModel {
  return {
    screen: app.screen,
    modal: app.modal,
    night: app.night,
    canContinue: nightInProgress(toSave()),
    assists: app.assists,
    meta: app.meta,
    selectedRoom: app.selectedRoom,
    selectedProps: app.selectedProps,
    selectedGuest: app.selectedGuest,
    guestSheet: app.guestSheet,
    toast: app.toast,
    log: app.log,
    moreOpen: app.moreOpen,
    tip: app.night && app.screen === "play" ? activeTip(app.night, app.meta) : null,
  };
}

function toSave(): SaveData {
  return {
    v: 1,
    updatedAt: new Date().toISOString(),
    seed: app.night?.seed ?? NIGHT.seed,
    assists: app.assists,
    night: app.night,
    undoStack: app.undo,
    meta: app.meta,
    screen: app.screen,
  };
}

function persist(): void {
  writeSave(toSave());
}

function speak(id: "live-polite" | "live-assertive", text: string): void {
  const node = document.getElementById(id);
  if (!node) return;
  node.textContent = "";
  queueMicrotask(() => {
    node.textContent = text;
  });
}

function noticeLines(state: NightState, notices: Notice[]): string[] {
  const lines: string[] = [];
  for (const notice of notices) {
    if (notice.kind === "arrival") lines.push(STRINGS.guests[notice.guest].arrival);
    else if (notice.kind === "bell") {
      lines.push(fill(STRINGS.notices.bell, { bell: notice.bell, name: bellName(notice.bell) }));
    } else if (notice.kind === "strain" && notice.reason === "refuse") lines.push(STRINGS.guests.hollow.refuse);
    else if (notice.kind === "strain" && notice.reason === "close_soft") lines.push(STRINGS.guests.hollow.softClose);
    else if (notice.kind === "strain" && notice.reason === "close_harsh") lines.push(STRINGS.guests.hollow.harshClose);
    else if (notice.kind === "strain" && notice.reason === "gutter") lines.push(STRINGS.notices.gutter);
    else if (notice.kind === "strain") lines.push(fill(STRINGS.notices.strain, { n: state.strain }));
    else if (notice.kind === "rest" && notice.guest === "mira") lines.push(STRINGS.guests.mira.rest);
    else if (notice.kind === "rest") {
      lines.push(fill(STRINGS.notices.restReady, { name: STRINGS.guests[notice.guest].name }));
    } else if (notice.kind === "seat" && notice.guest === "mira" && notice.how === "invite") {
      lines.push(STRINGS.guests.mira.invite);
    } else if (notice.kind === "seat" && notice.how === "alternate") lines.push(STRINGS.guests.bram.alternate);
    else if (notice.kind === "seat" && notice.how === "share" && notice.guest === "cadence") {
      lines.push(STRINGS.guests.cadence.share);
    } else if (notice.kind === "award" && notice.who === "shared") lines.push(STRINGS.notices.share);
    else if (notice.kind === "award" && notice.who === "cadence") lines.push(STRINGS.notices.awardCadence);
    else if (notice.kind === "award" && notice.who === "bram") lines.push(STRINGS.notices.awardBram);
    else if (notice.kind === "hint") lines.push(STRINGS.notices.hint);
    else if (notice.kind === "event") lines.push(STRINGS.events[notice.id].title);
  }
  return lines;
}

function remember(lines: string[]): void {
  if (!lines.length) return;
  app.log = [...lines, ...app.log].slice(0, 6);
  const urgent = lines.some((line) => /strain|arrives|Bell|Hollow|leave-path|fade|soft-close|seal/i.test(line));
  if (urgent) speak("live-assertive", lines.join(" "));
  else speak("live-polite", lines.join(" "));
}

function motionClass(): void {
  const pref = app.assists.reducedMotion;
  const system = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reduce = pref === null ? system : pref;
  document.documentElement.classList.toggle("reduced-motion", reduce);
  document.documentElement.classList.toggle("motion-ok", pref === false);
}

function paint(): void {
  motionClass();
  const focusId = document.activeElement?.getAttribute("data-focus");
  const jump = app.focusDialog;
  app.focusDialog = false;
  root.innerHTML = renderApp(model());
  const titles: Record<ScreenId, string> = {
    title: STRINGS.title,
    intro: STRINGS.title,
    play: `${STRINGS.title} — ${STRINGS.nightName}`,
    epilogue: `${STRINGS.epilogue.kicker}`,
  };
  document.title = titles[app.screen];
  if (jump) {
    const auto = root.querySelector<HTMLElement>("[data-autofocus], [role=dialog] button");
    auto?.focus();
    return;
  }
  if (focusId) {
    root.querySelector<HTMLElement>(`[data-focus="${CSS.escape(focusId)}"]`)?.focus();
  }
}

function toast(text: string): void {
  app.toast = text;
  speak("live-polite", text);
  paint();
}

function openModal(modal: Modal): void {
  app.modal = modal;
  app.focusDialog = true;
  paint();
}

function closeModal(): void {
  if (app.modal === "event") return;
  app.modal = null;
  paint();
}

function freshNight(): void {
  app.night = createNight({
    seed: NIGHT.seed,
    relaxedOil: app.assists.relaxedOil,
    propRefresh: app.assists.propRefresh,
    hostHints: app.assists.hostHints,
  });
  app.undo = [];
  app.selectedRoom = "map_room";
  app.selectedProps = [];
  app.selectedGuest = "mira";
  app.toast = null;
  app.log = [];
  app.moreOpen = false;
  app.meta.dismissedTipId = null;
  app.screen = app.meta.introSeen ? "play" : "intro";
  app.modal = null;
  if (app.screen === "intro") app.focusDialog = true;
  remember(noticeLines(app.night, app.night.notices));
  persist();
  paint();
}

function commit(action: Action): boolean {
  if (!app.night) {
    toast(STRINGS.errors.no_night);
    return false;
  }
  if (app.night.dawnLocked && action.type !== "confirmDawn") {
    toast(STRINGS.errors.dawn_locked);
    return false;
  }
  const oilBefore = app.night.oil;
  const prev = snapshotForUndo(app.night);
  let result = applyAction(app.night, action);
  if (!result.ok) {
    toast(STRINGS.errors[result.error]);
    return false;
  }
  let undo = pushSnapshot(app.undo, prev);
  let state = result.state;
  const endedByAction =
    action.type === "endBell" ||
    action.type === "resolveEvent" ||
    action.type === "ringDawn" ||
    action.type === "confirmDawn" ||
    action.type === "cancelDawn";
  if (
    !endedByAction &&
    state.phase === "play" &&
    !state.pendingEventId &&
    !state.awaitingDawnConfirm &&
    state.actionsLeft <= 0 &&
    !freeInviteAvailable(state)
  ) {
    const beforeEnd = snapshotForUndo(state);
    const ended = applyAction(state, { type: "endBell" });
    if (ended.ok) {
      undo = pushSnapshot(undo, beforeEnd);
      state = ended.state;
      result = ended;
    }
  }
  app.undo = undo;
  app.night = state;
  app.selectedProps = app.selectedProps.filter((id) => state.props[id].location === "tray");
  if (
    action.type === "mediate" ||
    action.type === "invite" ||
    action.type === "refuse" ||
    action.type === "resolveEvent" ||
    action.type === "cancelDawn"
  ) {
    app.modal = null;
  }
  if (state.pendingEventId) {
    app.modal = "event";
    app.focusDialog = true;
  } else if (state.awaitingDawnConfirm && action.type !== "cancelDawn") {
    app.modal = "dawn";
    app.focusDialog = true;
  }
  const lines = noticeLines(state, state.notices);
  remember(lines);
  if (state.oil !== oilBefore) {
    speak("live-polite", fill(STRINGS.aria.oil, { oil: state.oil, max: state.startOil }));
  }
  app.toast = lines[0] ?? null;
  if (action.type === "confirmDawn") {
    app.meta.nightsFinished += 1;
    app.meta.lastOutcome = state.outcome;
    app.meta.introSeen = true;
    app.screen = "epilogue";
    app.modal = null;
    app.focusDialog = false;
  }
  persist();
  paint();
  return true;
}

function undo(): void {
  if (!app.night || app.night.dawnLocked) {
    toast(app.night?.dawnLocked ? STRINGS.errors.dawn_locked : STRINGS.errors.undo_empty);
    return;
  }
  const popped = popSnapshot(app.undo);
  if (!popped) {
    toast(STRINGS.errors.undo_empty);
    return;
  }
  app.undo = popped.stack;
  app.night = popped.state;
  app.screen = popped.state.phase === "epilogue" ? "epilogue" : "play";
  app.modal = popped.state.pendingEventId ? "event" : popped.state.awaitingDawnConfirm ? "dawn" : null;
  app.focusDialog = app.modal !== null;
  app.toast = STRINGS.notices.undo;
  speak("live-polite", STRINGS.notices.undo);
  persist();
  paint();
}

function roomFromFocus(): RoomId | null {
  const id = document.activeElement?.closest("[data-room]")?.getAttribute("data-room");
  if (id && (ROOM_ORDER as readonly string[]).includes(id)) return id as RoomId;
  return app.selectedRoom;
}

function guestFromFocus(): GuestId | null {
  const id = document.activeElement?.closest("[data-guest]")?.getAttribute("data-guest");
  if (id && (GUEST_ORDER as readonly string[]).includes(id)) return id as GuestId;
  return app.selectedGuest;
}

function light(): void {
  const room = roomFromFocus();
  if (!room) {
    toast(STRINGS.errors.illegal);
    return;
  }
  app.selectedRoom = room;
  commit({ type: "light", room });
}

function stage(): void {
  const room = roomFromFocus();
  if (!room) {
    toast(STRINGS.errors.room_dark);
    return;
  }
  if (app.selectedProps.length < 1) {
    toast(STRINGS.errors.no_prop);
    return;
  }
  app.selectedRoom = room;
  commit({ type: "stage", room, props: app.selectedProps.slice(0, 2) });
}

function invite(): void {
  const guest = guestFromFocus();
  const room = app.selectedRoom;
  if (!guest || !room) {
    toast(STRINGS.errors.guest_refuses_room);
    return;
  }
  app.selectedGuest = guest;
  commit({ type: "invite", guest, room });
}

function onClick(event: Event): void {
  const target = event.target as HTMLElement;
  if (target.dataset.act === "backdrop") {
    closeModal();
    return;
  }
  const el = target.closest<HTMLElement>("[data-act]");
  if (!el) return;
  const act = el.dataset.act;
  if (act === "select-room" && el.dataset.room) {
    app.selectedRoom = el.dataset.room as RoomId;
    app.toast = null;
    paint();
    return;
  }
  if (act === "select-guest" && el.dataset.guest) {
    app.selectedGuest = el.dataset.guest as GuestId;
    app.guestSheet = app.selectedGuest;
    openModal("guest");
    return;
  }
  if (act === "select-prop" && el.dataset.prop) {
    const prop = el.dataset.prop as PropId;
    if (!app.night || app.night.props[prop].location !== "tray") {
      toast(STRINGS.errors.bad_props);
      return;
    }
    if (app.selectedProps.includes(prop)) app.selectedProps = app.selectedProps.filter((id) => id !== prop);
    else if (app.selectedProps.length >= 2) app.selectedProps = [app.selectedProps[1]!, prop];
    else app.selectedProps = [...app.selectedProps, prop];
    paint();
    return;
  }
  if (act === "new") return freshNight();
  if (act === "continue" && app.night) {
    app.screen = "play";
    app.modal = null;
    persist();
    paint();
    return;
  }
  if (act === "begin" || act === "skip") {
    app.meta.introSeen = true;
    app.screen = "play";
    app.focusDialog = false;
    persist();
    paint();
    return;
  }
  if (act === "about") return openModal("about");
  if (act === "settings") return openModal("settings");
  if (act === "rules") return openModal("rules");
  if (act === "close-modal" || act === "resume") return closeModal();
  if (act === "title") {
    app.screen = "title";
    app.modal = null;
    app.moreOpen = false;
    persist();
    paint();
    return;
  }
  if (act === "abandon") return openModal("abandon");
  if (act === "abandon-no") return openModal("settings");
  if (act === "abandon-yes") {
    const kept = clearNight(toSave());
    app.night = null;
    app.undo = [];
    app.screen = "title";
    app.modal = null;
    app.log = [];
    app.toast = null;
    writeSave(kept);
    paint();
    return;
  }
  if (act === "toggle" && el.dataset.assist) {
    const key = el.dataset.assist as keyof Assists;
    if (key === "reducedMotion") return;
    const current = app.assists[key];
    app.assists = { ...app.assists, [key]: !current };
    if ((key === "relaxedOil" || key === "hostHints" || key === "propRefresh") && app.night?.phase === "play") {
      app.toast = STRINGS.settings.nextNight;
    }
    persist();
    paint();
    return;
  }
  if (act === "dismiss-tip" && model().tip) {
    app.meta.dismissedTipId = model().tip!.id;
    persist();
    paint();
    return;
  }
  if (act === "more") {
    app.moreOpen = !app.moreOpen;
    app.focusDialog = false;
    paint();
    if (app.moreOpen) root.querySelector<HTMLElement>("[data-focus=more-invite]")?.focus();
    return;
  }
  if (act === "undo") return undo();
  if (act === "light") return light();
  if (act === "stage") return stage();
  if (act === "invite" || act === "sheet-invite") return invite();
  if (act === "mediate") {
    if (!app.night || !canMediateNow()) {
      toast(STRINGS.errors.nothing_to_mediate);
      return;
    }
    openModal("mediate");
    return;
  }
  if (act === "mediate-cadence") return void commit({ type: "mediate", choice: "cadence" });
  if (act === "mediate-bram") return void commit({ type: "mediate", choice: "bram" });
  if (act === "mediate-share") return void commit({ type: "mediate", choice: "share" });
  if (act === "close-soft") return void commit({ type: "close", mode: "soft" });
  if (act === "close-harsh") return void commit({ type: "close", mode: "harsh" });
  if (act === "refuse") return void commit({ type: "refuse" });
  if (act === "end") return void commit({ type: "endBell" });
  if (act === "dawn") {
    if (!app.night || !canRingDawn(app.night)) {
      toast(STRINGS.errors.dawn_not_ready);
      return;
    }
    commit({ type: "ringDawn" });
    return;
  }
  if (act === "dawn-yes") {
    commit({ type: "confirmDawn" });
    return;
  }
  if (act === "dawn-no") {
    commit({ type: "cancelDawn" });
    return;
  }
  if (act === "event-spend") return void commit({ type: "resolveEvent", choice: "spend" });
  if (act === "event-drip") return void commit({ type: "resolveEvent", choice: "drip" });
  if (act === "event-accept") return void commit({ type: "resolveEvent", choice: "accept" });
  if (act === "event-continue") return void commit({ type: "resolveEvent", choice: "continue" });
}

function canMediateNow(): boolean {
  if (!app.night) return false;
  const cadence = applyAction(app.night, { type: "mediate", choice: "cadence" });
  if (cadence.ok) return true;
  const share = applyAction(app.night, { type: "mediate", choice: "share" });
  return share.ok;
}

function onChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  if (target.dataset.act !== "motion") return;
  app.assists.reducedMotion =
    target.value === "on" ? true : target.value === "off" ? false : null;
  persist();
  paint();
}

function onKey(event: KeyboardEvent): void {
  const tag = (event.target as HTMLElement | null)?.tagName;
  if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.key === "Tab" && app.modal) {
    trap(event);
    return;
  }
  if (event.key === "Escape") {
    event.preventDefault();
    if (app.modal === "event") return;
    if (app.modal === "dawn") {
      commit({ type: "cancelDawn" });
      return;
    }
    if (app.modal) {
      closeModal();
      return;
    }
    if (app.moreOpen) {
      app.moreOpen = false;
      paint();
      return;
    }
    if (app.screen === "play") openModal("pause");
    return;
  }
  if (app.modal) return;
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  if (key === "?" || (event.key === "/" && event.shiftKey)) {
    event.preventDefault();
    openModal("rules");
    return;
  }
  if (key === "a") {
    event.preventDefault();
    openModal("about");
    return;
  }
  if (app.screen !== "play") return;
  if (key === "u") {
    event.preventDefault();
    undo();
  } else if (key === "1") {
    event.preventDefault();
    light();
  } else if (key === "2") {
    event.preventDefault();
    stage();
  } else if (key === "3") {
    event.preventDefault();
    invite();
  } else if (key === "4") {
    event.preventDefault();
    if (!app.night || !canMediateNow()) toast(STRINGS.errors.nothing_to_mediate);
    else openModal("mediate");
  } else if (key === "5") {
    event.preventDefault();
    commit({ type: "close", mode: "soft" });
  } else if (key === "e") {
    event.preventDefault();
    commit({ type: "endBell" });
  } else if (key === "d") {
    event.preventDefault();
    if (!app.night || !canRingDawn(app.night)) toast(STRINGS.errors.dawn_not_ready);
    else commit({ type: "ringDawn" });
  }
}

function trap(event: KeyboardEvent): void {
  const dialog = root.querySelector<HTMLElement>("[role=dialog]");
  if (!dialog) return;
  const items = Array.from(dialog.querySelectorAll<HTMLElement>("button, a[href], select")).filter(
    (el) => !el.hasAttribute("disabled"),
  );
  if (!items.length) return;
  const first = items[0]!;
  const last = items[items.length - 1]!;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function restore(saved: SaveData): void {
  app.assists = saved.assists;
  app.meta = saved.meta;
  app.night = saved.night;
  app.undo = saved.undoStack ?? [];
  app.screen = saved.night ? saved.screen : "title";
  if (app.screen === "title" && saved.night?.phase === "epilogue") app.screen = "epilogue";
  app.modal = saved.night?.pendingEventId ? "event" : saved.night?.awaitingDawnConfirm ? "dawn" : null;
}

export function start(mount: HTMLElement): void {
  root = mount;
  const saved = loadSave();
  if (saved) restore(saved);
  root.addEventListener("click", onClick);
  root.addEventListener("change", onChange);
  document.addEventListener("keydown", onKey);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") persist();
  });
  window.addEventListener("pagehide", persist);
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener?.("change", () => paint());
  paint();
}
