 // @ts-nocheck

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
/* import { PerspectiveCamera } from "three"; */
/* import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"; */
function CameraHelper() {
  const camera = new PerspectiveCamera(60, 1, 1, 3);
  return <group position={[0, 0, 2]}>
    <cameraHelper args={[camera]} />
  </group>;
} 

import { Audio, AudioListener, AudioLoader } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const CameraController = () => {
  const { camera,  gl  } = useThree();

  useEffect(() => {
    const audioListener = new AudioListener();
    camera.add(audioListener);
    const audioLoader = new AudioLoader();
    const sound = new Audio(audioListener);
    audioLoader.load(
      "./assets/sounds/energetic-rock-trailer-140906.mp3",
      function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
      }
    );
  }, []);
    useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);
      controls.minDistance = 3;
       controls.maxDistance = 20;
       console.log(camera.position)
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};

const SharedCanvasContainer = ({ children }: { children: any }) => {
  return (
    <Canvas>
      <ambientLight intensity={4} color="blue" />
      <directionalLight intensity={6} color="white" position={[0, 0.4, 1]} />
      {children}
     {/* <CameraHelper /> */}
      <CameraController /> 
    </Canvas>
  );
};

export default SharedCanvasContainer;
