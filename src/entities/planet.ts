export class Planet {
  x: number;
  y: number;
  scale: number;
  radius: number;
  color: string;
  constructor(x: number, y: number, scale: number, color: string) {
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.radius = Math.ceil((Math.random() * scale) / 8) * 8;
    this.color = color;
  }
  tick() {}
  render(x: number, y: number, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.x + this.scale / 2 - x,
      this.y + this.scale / 2 - y,
      this.radius / 3,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }
}
