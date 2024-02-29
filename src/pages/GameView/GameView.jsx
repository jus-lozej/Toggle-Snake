import Toggle from "../../components/Toggle/Toggle";
import { useGame } from "../../providers/game/game";
import "./style.scss";

const GameView = () => {
  const { gameMap, startTick, stopTick, ticking } = useGame();

  const gameMapComponents = gameMap.map((row, rowIdx) => {
    const rowToggles = row.map((el, colIdx) => {
      return <Toggle key={`row:${rowIdx}col:${colIdx}`} state={el}></Toggle>;
    });
    return (
      <div key={`row:${rowIdx}`} className="game-map-row">
        {rowToggles}
      </div>
    );
  });

  const handleClick = () => {
    if (ticking) {
      stopTick();
    } else {
      startTick(200);
    }
  };
  return (
    <div className="game-view" onClick={handleClick}>
      <div className="game-map">{gameMapComponents}</div>
    </div>
  );
};
GameView.propTypes = {};
export default GameView;
