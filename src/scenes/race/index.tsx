import { Canvas } from "@react-three/fiber";
import { RaceScene } from "./RaceScene";
import { SkyBox } from "../../GLTFModelsLoader";
import {CurrentCoinsAndScoresBoard, PauseGameButton, PauseModal} from "../../ui-components/Components";
import { useGlobalState } from "../../store/GlobalStore";

function RaceSceneHome() {
  const { modalRef } = useGlobalState();

  return (
    <>
      <div style={{ display: "none" }} ref={modalRef}>
        <PauseModal />
      </div>
      <div>
        <CurrentCoinsAndScoresBoard />
      </div>
      <PauseGameButton />
      <div id="app">
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
          <RaceScene />
        </Canvas>
      </div>
    </>
  );
}

export default RaceSceneHome;
