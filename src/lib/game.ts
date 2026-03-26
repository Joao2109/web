import { Camera } from "../entities/camera";
import { Galaxy } from "../entities/galaxy";
export const GameState = {
  Menu: "menu",
  Overview: "overview",
  Battle: "battle",
} as const;
export type GameState = (typeof GameState)[keyof typeof GameState];
export class Game {
  gameState: GameState = GameState.Menu;
  universe: Galaxy;
  camera: Camera;
  keys: { [key: string]: boolean } = {};
  constructor(size: number, planetCount: number, scale: number) {
    this.universe = new Galaxy(size * scale, planetCount, scale);
    this.camera = new Camera(
      (size * scale) / 2 - window.innerWidth / 2,
      (size * scale) / 2 - window.innerHeight / 2,
      window.innerWidth,
      window.innerHeight,
      16,
      size * scale,
      this.gameState
    );
    this.controls();
  }
  controls() {
    let dragging: boolean = false;
    let lastX: number = 0;
    let lastY: number = 0;
    document.addEventListener("keydown", (e) => {
      this.keys[e.code] = true;
    });
    document.addEventListener("keyup", (e) => {
      this.keys[e.code] = false;
    });
    document.addEventListener("click", (e) => {
      console.log(e.offsetX, e.offsetY);
    });
    document.addEventListener("mousedown", (e) => {
      switch (e.button) {
        case 0:
          dragging = true;
          lastX = e.clientX;
          lastY = e.clientY;
          break;
        case 1:
          break;
        case 2:
          e.preventDefault();
          break;
      }
    });
    document.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      move(e.clientX, e.clientY);
    });
    document.addEventListener("mouseup", () => {
      dragging = false;
      lastX = 0;
      lastY = 0;
    });
    document.addEventListener("touchstart", (e) => {
      dragging = true;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
    });
    document.addEventListener(
      "touchmove",
      (e) => {
        if (!e.touches.length || !dragging) return;
        e.preventDefault();
        move(e.touches[0].clientX, e.touches[0].clientY);
      },
      { passive: false }
    );
    document.addEventListener("touchend", () => {
      dragging = false;
    });
    const move = (x: number, y: number) => {
      const dx = x - lastX;
      const dy = y - lastY;
      if (dx === 0 && dy === 0) return;
      this.camera.x -= dx;
      this.camera.y -= dy;
      lastX = x;
      lastY = y;
      this.camera.x = clamp(
        this.camera.x,
        0,
        this.camera.universeSize - this.camera.width
      );
      this.camera.y = clamp(
        this.camera.y,
        0,
        this.camera.universeSize - this.camera.height
      );
    };
    const clamp = (val: number, min: number, max: number) =>
      Math.max(min, Math.min(val, max));
  }
  tick() {
    this.camera.dx =
      (this.keys["KeyD"] || this.keys["ArrowRight"] ? 1 : 0) -
      (this.keys["KeyA"] || this.keys["ArrowLeft"] ? 1 : 0);
    this.camera.dy =
      (this.keys["KeyS"] || this.keys["ArrowDown"] ? 1 : 0) -
      (this.keys["KeyW"] || this.keys["ArrowUp"] ? 1 : 0);
    this.universe.tick();
    this.camera.tick();
  }
  render(ctx: CanvasRenderingContext2D) {
    if (!ctx) return;
    this.universe.render(
      this.camera.x,
      this.camera.y,
      this.camera.width,
      this.camera.height,
      ctx
    );
    this.camera.render(ctx);
  }
  run() {
    const canvas: HTMLCanvasElement | null = document.querySelector("canvas");
    if (!canvas) return;
    canvas.width = this.camera.width;
    canvas.height = this.camera.height;
    const ctx = canvas.getContext("2d");
    const loop = () => {
      this.tick();
      this.render(ctx!);
      requestAnimationFrame(loop);
    };
    loop();
  }
}
const size = 256;
export const game = new Game(size, 1024, 64);
