import { MainRoad, MainRoadTwo, PickupTruck } from "../../GLTFModelsLoader";
import { useEffect, useRef } from "react";
import { Mesh } from "three";

const MainMenu = () => {
  const mainRoadRef = useRef<Mesh>(null);
  const mainRoadTwoRef = useRef<Mesh>(null);
  const pickupTruckRef = useRef<Mesh>(null);
  useEffect(() => {
    mainRoadRef.current?.scale.set(0.13, 0.13, 0.13);
    mainRoadRef.current?.position.set(0, -0.4, 0);
    mainRoadTwoRef.current?.scale.set(0.13, 0.13, 0.13);
    pickupTruckRef.current?.scale.set(0.09, 0.09, 0.09);
    pickupTruckRef.current?.position.set(0, -0.33, 3.8);
    mainRoadTwoRef.current?.position.set(0, -0.4, -15);
  }, []);
  return (
    <>
      <mesh ref={mainRoadRef}>
        <MainRoad />
      </mesh>
      <mesh ref={mainRoadTwoRef}>
        <MainRoadTwo />
      </mesh>

      <mesh
        ref={pickupTruckRef}
        rotation={[0, 20 * (Math.PI / 180), 0]}
        scale={[0.09, 0.09, 0.09]}
      >
        <PickupTruck />
      </mesh>
    </>
  );
};

export default MainMenu;
