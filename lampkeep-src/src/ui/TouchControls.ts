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
        <button type="button" id="btn-lamp" class="round lamp" aria-label="${STR.lamp}">L</button>
        <button type="button" id="btn-dodge" class="round dodge" aria-label="${STR.dodge}">D</button>
        <button type="button" id="btn-attack" class="round attack" aria-label="${STR.attack}">A</button>
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

    const hold = (id: string, key: "attack") => {
      const btn = this.root.querySelector(id)!;
      btn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        input.touch[key] = true;
      });
      const release = () => {
        input.touch[key] = false;
      };
      btn.addEventListener("pointerup", release);
      btn.addEventListener("pointercancel", release);
      btn.addEventListener("pointerleave", release);
    };
    hold("#btn-attack", "attack");
    const pulse = (id: string, key: "dodge" | "flare") => {
      this.root.querySelector(id)!.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        input.touch[key] = true;
      });
    };
    pulse("#btn-dodge", "dodge");
    pulse("#btn-lamp", "flare");

    const look = this.root.querySelector("#lookpad") as HTMLElement;
    let lookId = -1;
    let lx = 0;
    let ly = 0;
    look.addEventListener("pointerdown", (e) => {
      lookId = e.pointerId;
      lx = e.clientX;
      ly = e.clientY;
      look.setPointerCapture(e.pointerId);
      input.touch.look = true;
      e.preventDefault();
    });
    look.addEventListener("pointermove", (e) => {
      if (e.pointerId !== lookId) return;
      input.touch.lookX += e.clientX - lx;
      input.touch.lookY += e.clientY - ly;
      lx = e.clientX;
      ly = e.clientY;
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
