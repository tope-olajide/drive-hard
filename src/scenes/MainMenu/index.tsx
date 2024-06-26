

import Button, {
  TotalCoinsAndScoresBoard,
} from "../../ui-components/Components";
import MainMenu from "./MainMenu";
import SharedCanvasContainer from "../../SharedCanvasCointainer";

const MainMenuScene = () => {
  return ( 
    <>
      <div id="app">
        <TotalCoinsAndScoresBoard />
        <div className="main-menu-container">
          <Button name={"Play"} id="playButton" />
          <Button name={"Market"} id="marketButton" />
          <Button name={"About"} />
        </div>
        <SharedCanvasContainer>
          
         
          <MainMenu />
        </SharedCanvasContainer>
      </div>
    </>
  );
};

export default MainMenuScene;
