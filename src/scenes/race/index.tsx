
import { RaceScene } from "./RaceScene";
import { SkyBox } from "../../GLTFModelsLoader";
import {CurrentCoinsAndScoresBoard, GameOverModal, PauseGameButton, PauseModal} from "../../ui-components/Components";

import SharedCanvasContainer from "../../SharedCanvasCointainer";

function RaceSceneHome() {

  return (
    <>
      <div style={{ display: "none" }}>
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
         
          
          <RaceScene />
        </SharedCanvasContainer>
      </div>
    </>
  );
}

export default RaceSceneHome;
