
import { SkyBox } from "../../GLTFModelsLoader";

import CarSelection from "./CarSelection";
import { CarSelectionMenu, HomeMenu, TotalCoinsAndScoresBoard } from "../../ui-components/Components";
import SharedCanvasContainer from "../../SharedCanvasCointainer";

const CarSelectionScene = () => {
  return (
    <div id="app">
        <CarSelectionMenu />
      <TotalCoinsAndScoresBoard />
      <HomeMenu />
      <SharedCanvasContainer> 
        <mesh>
          <SkyBox />
        </mesh>
        <CarSelection />
      </SharedCanvasContainer>
    </div>
  );
};

export default CarSelectionScene;
