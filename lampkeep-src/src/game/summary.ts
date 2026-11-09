import { bellName, STRINGS } from "./content";
import { occupants } from "./engine";
import { GUEST_ORDER, ROOM_ORDER, type GuestId, type NightState, type RoomId } from "./types";

function guestName(id: GuestId): string {
  return STRINGS.guests[id].name;
}

function roomLabel(id: RoomId): string {
  return STRINGS.rooms[id];
}

function lampWord(state: NightState, id: RoomId): string {
  const room = state.rooms[id];
  if (id === "foyer") return STRINGS.states.always_lit;
  if (room.seal === "soft") return STRINGS.states.sealed_soft;
  if (room.seal === "harsh") return STRINGS.states.sealed_harsh;
  return STRINGS.states[room.lamp];
}

export function boardSummary(state: NightState): string {
  const rooms = ROOM_ORDER.map((id) => {
    const people = occupants(state, id).map((guest) => {
      const status = state.guests[guest].status;
      const word = status === "resting" ? STRINGS.states.resting : STRINGS.states.leave_ready;
      return `${guestName(guest)} ${word}`;
    });
    const who = people.length ? ` Occupied by ${people.join(", ")}.` : "";
    return `${roomLabel(id)} ${lampWord(state, id)}.${who}`;
  }).join(" ");
  const waiting = GUEST_ORDER.filter((id) => state.guests[id].status === "waiting").map(guestName);
  const waitingText = waiting.length ? waiting.join(", ") : STRINGS.noWaiting;
  return `Bell ${state.bell} of 6, ${bellName(state.bell)}. Oil ${state.oil} of ${state.startOil}. Strain ${state.strain}. Rooms: ${rooms} Guests waiting: ${waitingText}. Actions remaining: ${state.actionsLeft}.`;
}
