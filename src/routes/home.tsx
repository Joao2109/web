import "./home.css";
import { useEffect } from "react";
import { Game } from "../lib/game";
const HomePage = () => {
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    const size = 256;
    const game = new Game(size, 4096, 64);
    game.run();
  }, []);
  return <canvas></canvas>;
};

export default HomePage;
