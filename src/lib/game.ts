import { Camera } from "../entities/camera";
import { Universe } from "../entities/universe";
export const GameState = {
  Menu: "menu",
  Overview: "overview",
  Battle: "battle",
} as const;
export type GameState = (typeof GameState)[keyof typeof GameState];
export class Game {
  gameState: GameState = GameState.Menu;
  universe: Universe;
  camera: Camera;
  constructor(size: number, planetCount: number, scale: number) {
    this.universe = new Universe(size * scale, planetCount, scale);
    this.camera = new Camera(
      (size * scale) / 2 - window.innerWidth / 2,
      (size * scale) / 2 - window.innerHeight / 2,
      window.innerWidth,
      window.innerHeight,
      16,
      size * scale,
      this.gameState,
    );
  }
  tick() {
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
      ctx,
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
