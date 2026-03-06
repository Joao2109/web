import { HUD } from "./hud";
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
  hud: HUD;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    speed: number,
    universeSize: number
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.universeSize = universeSize;
    this.hud = new HUD(0, 0, this.width, this.height);
    this.controls();
    this.resize();
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
    document.addEventListener("mousedown", (e) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
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
    document.addEventListener("touchmove", (e) => {
      if (!dragging) return;
      e.preventDefault();
      move(e.touches[0].clientX, e.touches[0].clientY);
    });
    document.addEventListener("touchend", () => {
      dragging = false;
    });
    const move = (x: number, y: number) => {
      const dx = x - lastX;
      const dy = y - lastY;
      this.x -= dx;
      this.y -= dy;
      lastX = x;
      lastY = y;
      this.x = Math.max(0, Math.min(this.x, this.universeSize - this.width));
      this.y = Math.max(0, Math.min(this.y, this.universeSize - this.height));
    };
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
    const length = Math.hypot(this.dx, this.dy);
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
