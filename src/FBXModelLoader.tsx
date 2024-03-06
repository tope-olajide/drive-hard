import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

export function SkyBox() {
    const fbx = useLoader(FBXLoader, './assets/Poimandres.fbx')
    
    return <primitive object={fbx} />
}
  
export const Taxi = () => {
  const mesh = useLoader(FBXLoader, "./assets/Taxi.fbx");
  return (
    <>
      <primitive object={mesh.clone()}  />
    </>
  );
};



export const Bus = () => {
  const mesh = useLoader(FBXLoader, "./assets/Bus.fbx");
  return (
    <>
      <primitive object={mesh.clone()} />
    </>
  );
};



export const Limousine = () => {
  const mesh = useLoader(FBXLoader, "./assets/Limousine.fbx");
  return (
    <>
      <primitive object={mesh.clone()} />
    </>
  );
};

export const Firetruck = () => {
  const mesh = useLoader(FBXLoader, "./assets/Firetruck.fbx");
  return (
    <>
      <primitive object={mesh.clone()} />
    </>
  );
};

export const Van = () => {
  const mesh = useLoader(FBXLoader, "./assets/Van.fbx");
  return (
    <>
      <primitive object={mesh.clone()} />
    </>
  );
};



export const Ambulance = () => {
  const mesh = useLoader(FBXLoader, "./assets/Ambulance.fbx");
  return (
    <>
      <primitive object={mesh.clone()} />
    </>
  );
};