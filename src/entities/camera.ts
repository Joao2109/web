export class Camera {
  x: number;
  y: number;
  dx: number = 0;
  dy: number = 0;
  width: number;
  height: number;
  keys: { [key: string]: boolean } = {};
  speed: number;
  universeSize: number;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    speed: number,
    universeSize: number,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.universeSize = universeSize;
    this.controls();
    this.resize();
  }
  controls() {
    document.addEventListener("keydown", (e) => {
      this.keys[e.code] = true;
    });
    document.addEventListener("keyup", (e) => {
      this.keys[e.code] = false;
    });
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
    this.dx =
      (this.keys["KeyD"] || this.keys["ArrowRight"] ? 1 : 0) -
      (this.keys["KeyA"] || this.keys["ArrowLeft"] ? 1 : 0);
    this.dy =
      (this.keys["KeyS"] || this.keys["ArrowDown"] ? 1 : 0) -
      (this.keys["KeyW"] || this.keys["ArrowUp"] ? 1 : 0);
    const length = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    if (length > 0) {
      this.x += (this.dx / length) * this.speed;
      this.y += (this.dy / length) * this.speed;
    }
    this.x = Math.max(0, Math.min(this.x, this.universeSize - this.width));
    this.y = Math.max(0, Math.min(this.y, this.universeSize - this.height));
  }
  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "white";
    ctx.fillRect(this.width / 2 - 16, this.height / 2 - 1, 32, 2);
    ctx.fillRect(this.width / 2 - 1, this.height / 2 - 16, 2, 32);
  }
}
