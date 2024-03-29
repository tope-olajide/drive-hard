

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
     
        <CarSelection />
      </SharedCanvasContainer>
    </div>
  );
};

export default CarSelectionScene;
