import GameView from "./pages/GameView/GameView";
import GameProvider from "./providers/game";

function App() {
  return (
    <GameProvider>
      <GameView></GameView>
    </GameProvider>
  );
}

export default App;
