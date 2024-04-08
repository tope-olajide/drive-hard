

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";


const CameraController = () => {

  const bgx = useRef(
    new Audio("./assets/sounds/energetic-rock-trailer-140906.mp3")
  );
  useEffect(() => {
    bgx.current.play();
    bgx.current.loop = true;
    bgx.current.volume = 0.5;
    
  }, []);
    
  return null;
};

const SharedCanvasContainer = ({ children }: { children: any }) => {
  return (
    <Canvas>
      <ambientLight intensity={4} color="blue" />
      <directionalLight intensity={6} color="white" position={[0, 0.4, 1]} />
      {children}
      <CameraController /> 
    </Canvas>
  );
};

export default SharedCanvasContainer;
