import { GameState } from "../lib/game";
export class HUD {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number = 1;
  gameState: GameState;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    gameState: GameState,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.gameState = gameState;
  }
  tick() {}
  render(ctx: CanvasRenderingContext2D) {
    switch (this.gameState) {
      case GameState.Menu:
        break;
      case GameState.Overview:
        break;
      case GameState.Battle:
        break;
      default:
        break;
    }
  }
}
