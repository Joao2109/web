import "./home.css";
import { useEffect } from "react";
import { game } from "../lib/game";
const HomePage = () => {
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    game.run();
  }, []);
  return <canvas></canvas>;
};

export default HomePage;
