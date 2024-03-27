import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
/* import { PerspectiveCamera } from "three"; */
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
/* function CameraHelper() {
  const camera = new PerspectiveCamera(60, 1, 1, 3);
  return <group position={[0, 0, 2]}>
    <cameraHelper args={[camera]} />
  </group>;
} */

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 3;
      controls.maxDistance = 20;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};

const SharedCanvasContainer = ({ children }:{ children:any }) => {
  return (
    <Canvas>
      <ambientLight intensity={4} color="blue" />
      <directionalLight intensity={6} color="white" position={[0, 0.4, 1]} />
      {children}
     {/*  <CameraHelper /> */}
      <CameraController />
    </Canvas>
  );
};

export default SharedCanvasContainer;
