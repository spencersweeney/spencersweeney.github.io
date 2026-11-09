import { STR } from "../content/strings";
import type { InputManager } from "../input/InputManager";

export class TouchControls {
  readonly root: HTMLElement;

  constructor(parent: HTMLElement, input: InputManager) {
    this.root = document.createElement("div");
    this.root.id = "touch";
    this.root.innerHTML = `
      <div id="lookpad" aria-hidden="true"></div>
      <div id="stick" class="stick">
        <div id="knob"></div>
        <span>${STR.move}</span>
      </div>
      <div class="actions">
        <button type="button" id="btn-jump" class="round jump" aria-label="${STR.jump}">J</button>
        <button type="button" id="btn-lamp" class="round lamp" aria-label="${STR.lamp}">L</button>
      </div>
      <div id="rotate" role="status">${STR.rotate}</div>
    `;
    parent.appendChild(this.root);
    const stick = this.root.querySelector("#stick") as HTMLElement;
    const knob = this.root.querySelector("#knob") as HTMLElement;
    const max = 46;
    let pointer = -1;
    const setKnob = (x: number, y: number) => {
      knob.style.transform = `translate(${x}px, ${y}px)`;
    };
    stick.addEventListener("pointerdown", (e) => {
      pointer = e.pointerId;
      stick.setPointerCapture(e.pointerId);
      input.touch.down = true;
      e.preventDefault();
    });
    stick.addEventListener("pointermove", (e) => {
      if (e.pointerId !== pointer) return;
      const rect = stick.getBoundingClientRect();
      let x = e.clientX - (rect.left + rect.width / 2);
      let y = e.clientY - (rect.top + rect.height / 2);
      const len = Math.hypot(x, y) || 1;
      if (len > max) {
        x = (x / len) * max;
        y = (y / len) * max;
      }
      setKnob(x, y);
      input.touch.x = x / max;
      input.touch.y = -y / max;
      input.touch.down = true;
    });
    const endStick = (e: PointerEvent) => {
      if (e.pointerId !== pointer) return;
      pointer = -1;
      input.touch.down = false;
      input.touch.x = 0;
      input.touch.y = 0;
      setKnob(0, 0);
    };
    stick.addEventListener("pointerup", endStick);
    stick.addEventListener("pointercancel", endStick);
    const hold = (id: string, key: "jump" | "lamp") => {
      const btn = this.root.querySelector(id) as HTMLElement;
      const on = (e: Event) => {
        e.preventDefault();
        input.touch[key] = true;
      };
      const off = () => {
        input.touch[key] = false;
      };
      btn.addEventListener("pointerdown", on);
      btn.addEventListener("pointerup", off);
      btn.addEventListener("pointercancel", off);
    };
    hold("#btn-jump", "jump");
    hold("#btn-lamp", "lamp");
    const look = this.root.querySelector("#lookpad") as HTMLElement;
    let lookId = -1;
    let lastX = 0;
    let lastY = 0;
    look.addEventListener("pointerdown", (e) => {
      lookId = e.pointerId;
      lastX = e.clientX;
      lastY = e.clientY;
      input.touch.look = true;
    });
    look.addEventListener("pointermove", (e) => {
      if (e.pointerId !== lookId) return;
      input.touch.lookX += e.clientX - lastX;
      input.touch.lookY += e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      input.touch.look = true;
    });
    const endLook = (e: PointerEvent) => {
      if (e.pointerId !== lookId) return;
      lookId = -1;
      input.touch.look = false;
    };
    look.addEventListener("pointerup", endLook);
    look.addEventListener("pointercancel", endLook);
  }
}
