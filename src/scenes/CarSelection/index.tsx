import { Canvas } from "@react-three/fiber";
import { SkyBox } from "../../GLTFModelsLoader";

import CarSelection from "./CarSelection";
import { CarSelectionMenu, HomeMenu, TotalCoinsAndScoresBoard } from "../../ui-components/Components";

const CarSelectionScene = () => {
  return (
    <div id="app">
      
        <CarSelectionMenu />
      
      <TotalCoinsAndScoresBoard />
      <HomeMenu />
      <Canvas>
        <ambientLight intensity={4} color="blue" />
        <directionalLight intensity={6} color="white" position={[0, 0.4, 1]} />
        <mesh>
          <SkyBox />
        </mesh>
        <CarSelection />
      </Canvas>
    </div>
  );
};

export default CarSelectionScene;
