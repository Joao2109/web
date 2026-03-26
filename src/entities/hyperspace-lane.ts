export class HyperspaceLane {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  get length(): number {
    return Math.hypot(this.x2 - this.x1, this.y2 - this.y1);
  }
  get planets(): { x: number; y: number }[] {
    return [
      { x: this.x1, y: this.y1 },
      { x: this.x2, y: this.y2 },
    ];
  }
  tick() {}
  render(x: number, y: number, ctx: CanvasRenderingContext2D) {
    ctx.shadowColor = "lightblue";
    ctx.shadowBlur = 10;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x1 - x, this.y1 - y);
    ctx.lineTo(this.x2 - x, this.y2 - y);
    ctx.stroke();
  }
}
