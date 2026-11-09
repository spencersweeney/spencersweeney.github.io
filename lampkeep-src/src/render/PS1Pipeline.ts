import {
  Color,
  LinearSRGBColorSpace,
  NearestFilter,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
  WebGLRenderTarget,
} from "three";
import { createBlit } from "./pixelate";

const FOG = new Color(0x8b9994);

export class PS1Pipeline {
  readonly renderer: WebGLRenderer;
  readonly camera: PerspectiveCamera;
  private readonly rt: WebGLRenderTarget;
  private readonly blit = createBlit();
  private low = false;
  private samples: number[] = [];
  private width = 1;
  private height = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
      failIfMajorPerformanceCaveat: false,
    });
    this.renderer.setPixelRatio(1);
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.setClearColor(FOG, 1);
    this.camera = new PerspectiveCamera(60, 16 / 9, 0.08, 84);
    this.rt = new WebGLRenderTarget(480, 270, {
      magFilter: NearestFilter,
      minFilter: NearestFilter,
      depthBuffer: true,
    });
    this.rt.texture.colorSpace = LinearSRGBColorSpace;
    this.rt.texture.generateMipmaps = false;
    this.rt.texture.magFilter = NearestFilter;
    this.rt.texture.minFilter = NearestFilter;
  }

  setSize(width: number, height: number): void {
    this.width = Math.max(1, width);
    this.height = Math.max(1, height);
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(this.width, this.height, false);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.resizeTarget();
  }

  setFov(fov: number): void {
    this.camera.fov = fov;
    this.camera.updateProjectionMatrix();
  }

  noteFrame(dt: number): void {
    this.samples.push(dt);
    if (this.samples.length < 40) return;
    const avg = this.samples.reduce((sum, n) => sum + n, 0) / this.samples.length;
    this.samples = [];
    const nextLow = avg > 1 / 42 ? true : avg < 1 / 55 ? false : this.low;
    if (nextLow !== this.low) {
      this.low = nextLow;
      this.resizeTarget();
    }
  }

  render(scene: Scene): void {
    this.renderer.setRenderTarget(this.rt);
    this.renderer.setClearColor(FOG, 1);
    this.renderer.render(scene, this.camera);
    this.renderer.setRenderTarget(null);
    this.blit.material.uniforms.tDiffuse.value = this.rt.texture;
    this.renderer.render(this.blit.scene, this.blit.camera);
  }

  private resizeTarget(): void {
    const aspect = this.width / Math.max(1, this.height);
    const h = this.low ? 180 : 270;
    const w = Math.max(160, Math.round(h * aspect));
    this.rt.setSize(w, h);
    this.blit.setSize(w, h);
  }
}
