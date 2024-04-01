import { AssetsLoaderStatus } from "../../ui-components/Components";
import SharedCanvasContainer from "../../SharedCanvasCointainer";
import PreloadAssets from "./PreloadAssets";

const PreloadAssetsScene = () => {
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

export default PreloadAssetsScene;
