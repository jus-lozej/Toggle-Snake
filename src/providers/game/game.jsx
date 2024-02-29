import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { useInterval } from "../../hooks/useInterval";
import useSnake from "../../hooks/useSnake";
import { MAP_START, updateMap } from "./game.utils";

const GameContext = createContext(null);

export const GameProvider = ({ children = <></> }) => {
  const [gameMap, setGameMap] = useState(MAP_START);
  const [tickRate, setTickRate] = useState(null);
  const [ticking, setTicking] = useState(false);
  const [score, setScore] = useState(3);

  const snakeDirection = useSnake(6);

  useInterval(() => {
    const newMap = updateMap(gameMap, snakeDirection, score, (score) =>
      setScore(score),
    );

    setGameMap(newMap);
  }, tickRate);

  const stopTick = () => {
    setTicking(false);
    setTickRate(null);
  };

  const startTick = (tickRate) => {
    setTickRate(tickRate);
    setTicking(true);
  };

  const value = { gameMap, ticking, stopTick, startTick };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
GameProvider.propTypes = {
  children: PropTypes.element,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGame = () => {
  return useContext(GameContext);
};
