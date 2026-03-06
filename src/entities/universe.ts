import { Planet } from "./planet";
import { HyperspaceLane } from "./hyperspace-lane";
export class Universe {
  planets: Planet[] = [];
  hyperspaceLanes: HyperspaceLane[] = [];
  size: number;
  scale: number;
  constructor(size: number, planetCount: number, scale: number) {
    this.size = size;
    this.scale = scale;
    this.generatePlanets(planetCount);
    this.generateHyperspaceLanes();
  }
  tick() {
    this.planets.forEach((planet) => planet.tick());
  }
  render(
    x: number,
    y: number,
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D,
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
    this.planets.forEach((planet) => {
      if (
        planet.x + planet.radius > x &&
        planet.x < x + width &&
        planet.y + planet.radius > y &&
        planet.y < y + height
      ) {
        planet.render(x, y, ctx);
      }
    });
  }
  generatePlanets(planetCount: number) {
    this.planets = [];
    const usedPositions = new Set<string>();
    let attempts = 0;
    const planetColors = ["red", "green", "blue", "yellow", "purple"];
    while (this.planets.length < planetCount && attempts < planetCount * 10) {
      const x =
        Math.floor((Math.random() * (this.size - 1)) / this.scale) * this.scale;
      const y =
        Math.floor((Math.random() * (this.size - 1)) / this.scale) * this.scale;
      const key = `${x},${y}`;
      if (!usedPositions.has(key)) {
        usedPositions.add(key);
        this.planets.push(
          new Planet(
            x,
            y,
            this.scale,
            planetColors[Math.floor(Math.random() * planetColors.length)],
          ),
        );
      }
      attempts++;
    }
    this.planets.sort(
      (a, b) =>
        Math.hypot(a.x - this.size / 2, a.y - this.size / 2) -
        Math.hypot(b.x - this.size / 2, b.y - this.size / 2),
    );
  }
  generateHyperspaceLanes() {
    this.planets.forEach((planet, index) => {
      const nearestPlanets = this.planets
        .slice(index + 1)
        .filter(
          (p) => Math.hypot(planet.x - p.x, planet.y - p.y) < 10 * this.scale,
        )
        .sort(
          (a, b) =>
            Math.hypot(a.x - this.size / 2, a.y - this.size / 2) -
            Math.hypot(b.x - this.size / 2, b.y - this.size / 2),
        )
        .slice(0, 3);
      for (let i = 0; i < nearestPlanets.length; i++) {
        if (
          Math.hypot(
            planet.x - nearestPlanets[i].x,
            planet.y - nearestPlanets[i].y,
          ) <
          10 * this.scale
        ) {
          this.hyperspaceLanes.push(
            new HyperspaceLane(
              planet.x + this.scale / 2,
              planet.y + this.scale / 2,
              nearestPlanets[i].x + this.scale / 2,
              nearestPlanets[i].y + this.scale / 2,
            ),
          );
        }
      }
    });
  }
}
