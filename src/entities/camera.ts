import type { GameState } from "../lib/game";
import { HUD } from "./hud";
export class Camera {
  x: number;
  y: number;
  dx: number = 0;
  dy: number = 0;
  width: number;
  height: number;
  speed: number;
  universeSize: number;
  hud: HUD;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    speed: number,
    universeSize: number,
    gameState: GameState,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.universeSize = universeSize;
    this.hud = new HUD(0, 0, this.width, this.height, gameState);
    this.resize();
  }
  resize() {
    window.addEventListener("resize", () => {
      const canvas: HTMLCanvasElement | null = document.querySelector("canvas");
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    });
  }
  tick() {
    const length = Math.hypot(this.dx, this.dy);
    if (length > 0) {
      this.x += (this.dx / length) * this.speed;
      this.y += (this.dy / length) * this.speed;
    }
    this.x = Math.max(0, Math.min(this.x, this.universeSize - this.width));
    this.y = Math.max(0, Math.min(this.y, this.universeSize - this.height));
  }
  render(ctx: CanvasRenderingContext2D) {
    this.hud.render(ctx);
  }
}
