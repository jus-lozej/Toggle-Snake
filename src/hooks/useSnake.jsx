import { useEffect, useState } from "react";

const useSnake = (initialDirection = 6) => {
  const [snakeDirection, setSnakeDirection] = useState(initialDirection);

  const handleKeyDown = (e) => {
    if (e.keyCode == 37) {
      // Left
      setSnakeDirection(4);
    } else if (e.keyCode == 38) {
      // up
      setSnakeDirection(8);
    } else if (e.keyCode == 39) {
      // right
      setSnakeDirection(6);
    } else if (e.keyCode == 40) {
      // down
      setSnakeDirection(2);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.addEventListener("keydown", handleKeyDown);
    };
  }, [snakeDirection]);
  return snakeDirection;
};
export default useSnake;
