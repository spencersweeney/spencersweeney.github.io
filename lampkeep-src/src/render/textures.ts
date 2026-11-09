import { CanvasTexture, NearestFilter, RepeatWrapping, SRGBColorSpace, type Texture } from "three";

function canvas(size: number, paint: (ctx: CanvasRenderingContext2D, s: number) => void): Texture {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("canvas");
  paint(ctx, size);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.magFilter = NearestFilter;
  tex.minFilter = NearestFilter;
  tex.generateMipmaps = false;
  tex.wrapS = RepeatWrapping;
  tex.wrapT = RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}

export function grassTexture(): Texture {
  return canvas(64, (ctx, s) => {
    ctx.fillStyle = "#3e5a32";
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 90; i++) {
      ctx.fillStyle = i % 3 === 0 ? "#2c4626" : i % 3 === 1 ? "#4d6b3c" : "#5d7a3a";
      const x = (i * 17) % s;
      const y = (i * 29) % s;
      ctx.fillRect(x, y, 4, 5);
      ctx.fillRect(x + 1, y - 2, 2, 3);
    }
  });
}

export function dirtTexture(): Texture {
  return canvas(64, (ctx, s) => {
    ctx.fillStyle = "#6b4e36";
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 70; i++) {
      ctx.fillStyle = i % 2 ? "#7d5c40" : "#543824";
      ctx.fillRect((i * 13) % s, (i * 19) % s, 5, 3);
    }
    ctx.fillStyle = "#8d8478";
    for (let i = 0; i < 16; i++) ctx.fillRect((i * 23) % s, (i * 11) % s, 2, 2);
    ctx.fillStyle = "#3f6a32";
    for (let i = 0; i < 10; i++) ctx.fillRect((i * 29) % s, (i * 7) % s, 2, 3);
  });
}

export function cloakTexture(): Texture {
  return canvas(32, (ctx, s) => {
    ctx.fillStyle = "#2c5834";
    ctx.fillRect(0, 0, s, s);
    ctx.fillStyle = "#1e4026";
    for (let y = 0; y < s; y += 4) ctx.fillRect(0, y, s, 1);
    ctx.fillStyle = "#3e7442";
    for (let x = 2; x < s; x += 6) ctx.fillRect(x, 0, 2, s);
  });
}
