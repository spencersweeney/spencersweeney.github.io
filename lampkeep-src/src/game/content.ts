import night from "../../content/night_of_soft_rain.json";
import rooms from "../../content/rooms.json";
import props from "../../content/props.json";
import guests from "../../content/guests.json";
import events from "../../content/events.json";
import strings from "../../content/strings.json";
import type { EventId, GuestId, PropId, RoomId } from "./types";

export interface GuestDef {
  preferred: RoomId | null;
  accepted: RoomId[];
  propTags: string[];
  restBells: number;
  canRest: boolean;
  acceptShare?: boolean;
}

export const NIGHT = night;
export const ROOMS = rooms as { id: RoomId; start: "unlit" | "lit" }[];
export const PROPS = props as { id: PropId; tag: string }[];
export const GUESTS = guests as Record<GuestId, GuestDef>;
export const EVENTS = events as { id: EventId }[];
export const STRINGS = strings;

export const PROP_TAG: Record<PropId, string> = Object.fromEntries(
  PROPS.map((p) => [p.id, p.tag]),
) as Record<PropId, string>;

export function bellName(bell: number): string {
  const table = strings.bells as Record<string, string>;
  return table[String(bell)] ?? "";
}
