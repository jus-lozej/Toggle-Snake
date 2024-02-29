import { useEffect, useState } from "react";

const useSnake = (initialDirection = 6) => {
  const [snakeDirection, setSnakeDirection] = useState(initialDirection);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode == 37 && snakeDirection != 6) {
        // Left
        setSnakeDirection(4);
      } else if (e.keyCode == 38 && snakeDirection != 2) {
        // up
        setSnakeDirection(8);
      } else if (e.keyCode == 39 && snakeDirection != 4) {
        // right
        setSnakeDirection(6);
      } else if (e.keyCode == 40 && snakeDirection != 8) {
        // down
        setSnakeDirection(2);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [snakeDirection]);

  return snakeDirection;
};
export default useSnake;
