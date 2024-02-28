import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { useInterval } from "../hooks/useInterval";
import useSnake from "../hooks/useSnake";

const GameContext = createContext(null);

const MAP_START = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 2, 3, 4, 5, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const updateMap = (map, snakeDirection) => {
  const newMap = JSON.parse(JSON.stringify(map));
  let max = 0;
  let maxLoc = { x: null, y: null };
  for (let y in map) {
    for (let x in map[y]) {
      const current = map[y][x];
      if (current > max) {
        max = current;
        maxLoc = { x, y };
      }
      if (current > 0) {
        newMap[y][x]--;
      }
    }
  }
  maxLoc = { x: parseInt(maxLoc.x), y: parseInt(maxLoc.y) };

  if (snakeDirection == 6) {
    if (maxLoc.x + 1 < map[maxLoc.y].length) {
      newMap[maxLoc.y][maxLoc.x + 1] = max;
    } else {
      // Wall collision
      newMap[maxLoc.y][0] = max;
    }
  } else if (snakeDirection == 2) {
    if (maxLoc.y + 1 < map.length) {
      newMap[maxLoc.y + 1][maxLoc.x] = max;
    } else {
      // Wall collision
      newMap[0][maxLoc.x] = max;
    }
  } else if (snakeDirection == 4) {
    if (maxLoc.x - 1 >= 0) {
      newMap[maxLoc.y][maxLoc.x - 1] = max;
    } else {
      // Wall collision
      newMap[maxLoc.y][newMap[maxLoc.y].length - 1] = max;
    }
  } else if (snakeDirection == 8) {
    if (maxLoc.y - 1 >= 0) {
      newMap[maxLoc.y - 1][maxLoc.x] = max;
    } else {
      // Wall collision
      newMap[map.length - 1][maxLoc.x] = max;
    }
  }
  return newMap;
};

export const GameProvider = ({ children = <></> }) => {
  const [gameMap, setGameMap] = useState(MAP_START);
  const [tickRate, setTickRate] = useState(null);
  const [ticking, setTicking] = useState(false);
  const snakeDirection = useSnake(6);

  useInterval(() => {
    const newMap = updateMap(gameMap, snakeDirection);

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
