import { System } from "./system";
import { HyperspaceLane } from "./hyperspace-lane";
export class Galaxy {
  systems: System[] = [];
  hyperspaceLanes: HyperspaceLane[] = [];
  size: number;
  scale: number;
  constructor(size: number, systemCount: number, scale: number) {
    this.size = size;
    this.scale = scale;
    this.generateSystems(systemCount);
    this.generateHyperspaceLanes();
  }
  tick() {
    this.systems.forEach((system) => system.tick());
  }
  render(
    x: number,
    y: number,
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D
  ) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    this.hyperspaceLanes.forEach((lane) => {
      // if (
      //   lane.x1 + lane.length > x &&
      //   lane.x1 < x + width &&
      //   lane.y1 + lane.length > y &&
      //   lane.y1 < y + height
      // ) {
      lane.render(x, y, ctx);
      // }
    });
    this.systems.forEach((system) => {
      if (
        system.x + system.radius > x &&
        system.x < x + width &&
        system.y + system.radius > y &&
        system.y < y + height
      ) {
        system.render(x, y, ctx);
      }
    });
  }
  generateSystems(systemCount: number) {
    this.systems = [];
    const usedPositions = new Set<string>();
    let attempts = 0;
    const systemStyles: { color: string; glow: string }[] = [
      { color: "red", glow: "red" },
      { color: "yellow", glow: "orange" },
      { color: "lightblue", glow: "blue" },
    ];
    while (this.systems.length < systemCount && attempts < systemCount * 10) {
      const x =
        Math.floor((Math.random() * (this.size - 1)) / this.scale) * this.scale;
      const y =
        Math.floor((Math.random() * (this.size - 1)) / this.scale) * this.scale;
      const key = `${x},${y}`;
      if (!usedPositions.has(key)) {
        usedPositions.add(key);
        this.systems.push(
          new System(
            x,
            y,
            this.scale,
            systemStyles[Math.floor(Math.random() * systemStyles.length)]
          )
        );
      }
      attempts++;
    }
    this.systems.sort(
      (a, b) =>
        Math.hypot(a.x - this.size / 2, a.y - this.size / 2) -
        Math.hypot(b.x - this.size / 2, b.y - this.size / 2)
    );
  }
  generateHyperspaceLanes() {
    this.systems.forEach((system, index) => {
      const nearestSystems = this.systems
        .slice(index + 1)
        .filter(
          (s) => Math.hypot(system.x - s.x, system.y - s.y) < 10 * this.scale
        )
        .sort(
          (a, b) =>
            Math.hypot(a.x - this.size / 2, a.y - this.size / 2) -
            Math.hypot(b.x - this.size / 2, b.y - this.size / 2)
        )
        .slice(0, 3);
      for (let i = 0; i < nearestSystems.length; i++) {
        if (
          Math.hypot(
            system.x - nearestSystems[i].x,
            system.y - nearestSystems[i].y
          ) <
          10 * this.scale
        ) {
          this.hyperspaceLanes.push(
            new HyperspaceLane(
              system.x + this.scale / 2,
              system.y + this.scale / 2,
              nearestSystems[i].x + this.scale / 2,
              nearestSystems[i].y + this.scale / 2
            )
          );
        }
      }
    });
  }
}
