import { CarRace } from "./RaceScene";
import {
  CurrentCoinsAndScoresBoard,
  GameOverModal,
  PauseGameButton,
  PauseModal,
} from "../../ui-components/Components";

import SharedCanvasContainer from "../../SharedCanvasCointainer";

function CarRaceScene() {
  return (
    <>
      <div style={{ display: "none" }}  id="pauseModalContainer">
        <PauseModal />
      </div>

      <div style={{ display: "none" }} id="gameOverModalContainer">
        <GameOverModal />
      </div>
      <div>
        <CurrentCoinsAndScoresBoard />
      </div>
      <PauseGameButton />
      <div id="app">
        <SharedCanvasContainer>
          <CarRace />
        </SharedCanvasContainer>
      </div>
    </>
  );
}

export default CarRaceScene;
