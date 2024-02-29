export const MAP_START = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 2, 3, 0, 0, -1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const sampleRandomLocation = (locations = []) => {
  return { ...locations[Math.floor(Math.random() * locations.length)] };
};

export const updateMap = (
  map = [],
  snakeDirection = 6,
  score = 3,
  setScore = () => {},
) => {
  const newMap = JSON.parse(JSON.stringify(map));
  let maxLoc = { x: null, y: null };

  const emptyLocations = [];
  for (let y in map) {
    for (let x in map[y]) {
      const current = map[y][x];
      if (current == 0) {
        emptyLocations.push({ x, y });
      }
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

        // Create new cherry
        const cherryLoc = sampleRandomLocation(emptyLocations);
        newMap[cherryLoc.y][cherryLoc.x] = -1;
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

        // Create new cherry
        const cherryLoc = sampleRandomLocation(emptyLocations);
        newMap[cherryLoc.y][cherryLoc.x] = -1;
      } else {
        newMap[maxLoc.y + 1][maxLoc.x] = score;
      }
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

        // Create new cherry
        const cherryLoc = sampleRandomLocation(emptyLocations);
        newMap[cherryLoc.y][cherryLoc.x] = -1;
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

        // Create new cherry
        const cherryLoc = sampleRandomLocation(emptyLocations);
        newMap[cherryLoc.y][cherryLoc.x] = -1;
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
