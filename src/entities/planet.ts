import { game } from "../lib/game";
import type { HyperspaceLane } from "./hyperspace-lane";

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
    this.radius = Math.ceil((Math.random() * scale) / 2) + 16;
    this.color = color;
  }
  get hyperspaceLanes(): HyperspaceLane[] {
    const lanes: HyperspaceLane[] = [];
    game.universe.hyperspaceLanes.forEach((lane) => {
      if (
        (lane.x1 === this.x && lane.y1 === this.y) ||
        (lane.x2 === this.x && lane.y2 === this.y)
      ) {
        lanes.push(lane);
      }
    });
    return lanes;
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
