import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { useInterval } from "../hooks/useInterval";
import useSnake from "../hooks/useSnake";

const GameContext = createContext(null);

const MAP_START = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 2, 3, 0, 0, -1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const updateMap = (map, snakeDirection, score, setScore = () => {}) => {
  const newMap = JSON.parse(JSON.stringify(map));
  let maxLoc = { x: null, y: null };
  for (let y in map) {
    for (let x in map[y]) {
      const current = map[y][x];
      if (current == score) {
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
      if (newMap[maxLoc.y][maxLoc.x + 1] == -1) {
        // Cherry collision
        newMap[maxLoc.y][maxLoc.x + 1] = score + 1;
        setScore(score + 1);
      } else {
        newMap[maxLoc.y][maxLoc.x + 1] = score;
      }
    } else {
      // Wall collision
      // Currently teleport to other side
      newMap[maxLoc.y][0] = score;
    }
  } else if (snakeDirection == 2) {
    if (maxLoc.y + 1 < map.length) {
      if (newMap[maxLoc.y + 1][maxLoc.x] == -1) {
        // Cherry collision
        newMap[maxLoc.y + 1][maxLoc.x] = score + 1;
        setScore(score + 1);
      } else {
        newMap[maxLoc.y + 1][maxLoc.x] = score;
      }
      newMap[maxLoc.y + 1][maxLoc.x] = score;
    } else {
      // Wall collision
      // Currently teleport to other side
      newMap[0][maxLoc.x] = score;
    }
  } else if (snakeDirection == 4) {
    if (maxLoc.x - 1 >= 0) {
      if (newMap[maxLoc.y][maxLoc.x - 1] == -1) {
        // Cherry collision
        newMap[maxLoc.y][maxLoc.x - 1] = score + 1;
        setScore(score + 1);
      } else {
        newMap[maxLoc.y][maxLoc.x - 1] = score;
      }
    } else {
      // Wall collision
      // Currently teleport to other side
      newMap[maxLoc.y][newMap[maxLoc.y].length - 1] = score;
    }
  } else if (snakeDirection == 8) {
    if (maxLoc.y - 1 >= 0) {
      if (newMap[maxLoc.y - 1][maxLoc.x] == -1) {
        // Cherry collision
        newMap[maxLoc.y - 1][maxLoc.x] = score + 1;
        setScore(score + 1);
      } else {
        newMap[maxLoc.y - 1][maxLoc.x] = score;
      }
    } else {
      // Wall collision
      // Currently teleport to other side
      newMap[map.length - 1][maxLoc.x] = score;
    }
  }
  return newMap;
};

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
