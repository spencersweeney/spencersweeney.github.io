export interface Bindings {
  up: string[];
  down: string[];
  left: string[];
  right: string[];
  jump: string[];
  lamp: string[];
  interact: string[];
  pause: string[];
  run: string[];
}

export const DEFAULT_BINDINGS: Bindings = {
  up: ["KeyW", "ArrowUp"],
  down: ["KeyS", "ArrowDown"],
  left: ["KeyA", "ArrowLeft"],
  right: ["KeyD", "ArrowRight"],
  jump: ["Space"],
  lamp: ["KeyE", "mouse0"],
  interact: ["KeyF"],
  pause: ["Escape", "KeyP"],
  run: ["ShiftLeft", "ShiftRight"],
};

export const BINDING_LABELS: { action: keyof Bindings; label: string }[] = [
  { action: "up", label: "Move forward" },
  { action: "down", label: "Move back" },
  { action: "left", label: "Move left" },
  { action: "right", label: "Move right" },
  { action: "jump", label: "Jump / glide" },
  { action: "lamp", label: "Lamp" },
  { action: "interact", label: "Read" },
  { action: "run", label: "Run" },
  { action: "pause", label: "Pause" },
];

export function keyLabel(code: string): string {
  if (code === "mouse0") return "Click";
  if (code === "mouse2") return "Right click";
  if (code === "Space") return "Space";
  if (code === "Escape") return "Esc";
  if (code === "ShiftLeft" || code === "ShiftRight") return "Shift";
  if (code.startsWith("Key")) return code.slice(3);
  if (code.startsWith("Arrow")) return code.slice(5);
  return code;
}
