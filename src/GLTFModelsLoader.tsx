import { useLoader } from "@react-three/fiber";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
export const SkyBox = () => {
  const skybox = useLoader(GLTFLoader, "./assets/skybox.glb");
  return <primitive object={skybox.scene} />;
};

export const MainRoad = () => {
  const road = useLoader(GLTFLoader, "./assets/Asphalt.glb");

  return (
    <>
      <primitive object={road.scene} />
    </>
  );
};

export const MainRoadTwo = () => {
  const road = useLoader(GLTFLoader, "./assets/Asphalt.glb");
  return (
    <>
      <primitive object={road.scene.clone()} />
    </>
  );
};

export const PickupTruck = () => {
  const pickup = useLoader(GLTFLoader, "./assets/Pickup.glb");
  return (
    <>
      <primitive object={pickup.scene} />
    </>
  );
};

export const Offroad = () => {
  const pickup = useLoader(GLTFLoader, "./assets/Offroad.glb");
  return (
    <>
      <primitive object={pickup.scene} />
    </>
  );
};





export const SUV = () => {
  const pickup = useLoader(GLTFLoader, "./assets/SUV.glb");
  return (
    <>
      <primitive object={pickup.scene} />
    </>
  );
};

export const Ferrari = () => {
  const pickup = useLoader(GLTFLoader, "./assets/Ferrari.glb");
  return (
    <>
      <primitive object={pickup.scene} />
    </>
  );
};

