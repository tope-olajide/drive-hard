import { Canvas } from "@react-three/fiber";
import { SkyBox } from "../../GLTFModelsLoader";

import Button, {
  TotalCoinsAndScoresBoard,
} from "../../ui-components/Components";
import MainMenu from "./MainMenu";

const MainMenuScene = () => {
  return ( 
    <>
      <div id="app">
        <TotalCoinsAndScoresBoard />
        <div className="main-menu-container">
          <Button name={"Play"} id="playButton" />
          <Button name={"Market"} />
          <Button name={"Tournament"} />
          <Button name={"About"} />
        </div>
        <Canvas>
          <ambientLight intensity={4} color="blue" />
          <directionalLight
            intensity={8}
            color="white"
            position={[0, 0.4, 1]}
          />
          <mesh>
            <SkyBox />
          </mesh>
          <MainMenu />
        </Canvas>
      </div>
    </>
  );
};

export default MainMenuScene;
