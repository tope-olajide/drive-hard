import { Canvas } from "@react-three/fiber";

const SharedCanvasContainer = ({ children }:{ children:any }) => {
  return (
    <Canvas>
      <ambientLight intensity={4} color="blue" />
      <directionalLight intensity={6} color="white" position={[0, 0.4, 1]} />
      {children}
    </Canvas>
  );
};

export default SharedCanvasContainer;
