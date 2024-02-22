

import { Canvas } from "@react-three/fiber";
import { AnimatedBox } from "./AnitmatedBox";



function FirstScene() {
  
  return (
    <>
      <div id="app">
        
        <Canvas>

          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 0]} />

          <AnimatedBox />
        </Canvas>
      </div>
    </>
  );
}

export default FirstScene;
