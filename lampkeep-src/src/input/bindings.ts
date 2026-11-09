export interface Bindings {
  up: string[];
  down: string[];
  left: string[];
  right: string[];
  attack: string[];
  dodge: string[];
  flare: string[];
  lockOn: string[];
  interact: string[];
  pause: string[];
}

/** Defaults match the controls card. Mouse buttons use mouse0 / mouse1 / mouse2. */
export const DEFAULT_BINDINGS: Bindings = {
  up: ["KeyW"],
  down: ["KeyS"],
  left: ["KeyA"],
  right: ["KeyD"],
  attack: ["mouse0", "KeyJ"],
  dodge: ["Space", "KeyK", "ShiftLeft"],
  flare: ["KeyF", "KeyL"],
  lockOn: ["KeyQ", "mouse2"],
  interact: ["KeyE"],
  pause: ["Escape"],
};

export const BINDING_LABELS: { action: keyof Bindings; label: string }[] = [
  { action: "up", label: "Move forward" },
  { action: "down", label: "Move back" },
  { action: "left", label: "Move left" },
  { action: "right", label: "Move right" },
  { action: "attack", label: "Attack" },
  { action: "dodge", label: "Dodge" },
  { action: "flare", label: "Lamp Flare" },
  { action: "lockOn", label: "Lock-On" },
  { action: "interact", label: "Interact" },
  { action: "pause", label: "Pause" },
];

export function keyLabel(code: string): string {
  if (code === "mouse0") return "Click";
  if (code === "mouse1") return "Middle click";
  if (code === "mouse2") return "Right click";
  if (code === "Space") return "Space";
  if (code === "Escape") return "Esc";
  if (code === "ShiftLeft" || code === "ShiftRight") return "Shift";
  if (code.startsWith("Key")) return code.slice(3);
  if (code.startsWith("Digit")) return code.slice(5);
  return code;
}
