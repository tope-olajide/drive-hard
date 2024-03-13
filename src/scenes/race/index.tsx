

import { Canvas } from "@react-three/fiber";
import { RaceScene } from "./RaceScene";
import { SkyBox } from "../../GLTFModelsLoader";


function RaceSceneHome() {
  
  return (
    <>
      <div id="app">
        <Canvas>
          <ambientLight intensity={4} color="blue" />
          <directionalLight  intensity={8} color="white" position={[0, 0.4, 1]} />
          <mesh>
            <SkyBox />
          </mesh>
          <RaceScene />
        </Canvas>
      </div>
    </>
  );
}

export default RaceSceneHome;
