

import Button, {
  AssetsLoaderStatus,
    TotalCoinsAndScoresBoard,
  } from "../../ui-components/Components";
  import MainMenu from "./MainMenu";
  import SharedCanvasContainer from "../../SharedCanvasCointainer";
import PreloadAssets from "./PreloadAssets";
import AssetsLoader from "../../AssetsLoader";
  
  const AssetsLoaderScene = () => {
    return ( 
      <>
        <div id="app">
          
          <AssetsLoaderStatus />
         
          <SharedCanvasContainer>
            <PreloadAssets />
          </SharedCanvasContainer>
        </div>
      </>
    );
  };
  
  export default AssetsLoaderScene;
  