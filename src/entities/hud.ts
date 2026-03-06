export class HUD {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number = 1;
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  tick() {}
  render(ctx: CanvasRenderingContext2D) {}
}
