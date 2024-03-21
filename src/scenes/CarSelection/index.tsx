import { Canvas } from "@react-three/fiber";
import {

  SkyBox,
} from "../../GLTFModelsLoader";


import CarSelection from "./CarSelection";
import { CarSelectionMenu } from "../../ui-components/Components";


const CarSelectionScene = () => {

  return (
      <div id="app">
          <div><CarSelectionMenu /></div>
          
      <Canvas>
        <ambientLight intensity={4} color="blue" />
        <directionalLight intensity={5} color="white" position={[0, 0.4, 1]} />
        <mesh>
          <SkyBox />
        </mesh>
        <CarSelection />
      </Canvas>
    </div>
  );
};

export default CarSelectionScene;
