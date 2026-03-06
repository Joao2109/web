import { Planet } from "./planet";
export class Universe {
  planets: Planet[] = [];
  size: number;
  scale: number;
  constructor(size: number, planetCount: number, scale: number) {
    console.log(size);
    this.size = size;
    this.scale = scale;
    this.generatePlanets(planetCount);
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
    console.log(this.planets);
  }
}
