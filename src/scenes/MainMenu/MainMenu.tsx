import {
  MainRoad,
  MainRoadTwo,
  PickupTruck,
  Ferrari,
  Offroad,
  SUV,
  BuildingBlockA,
  BuildingBlockB,
  BuildingBlockC,
  BuildingBlockD,
} from "../../GLTFModelsLoader";
import { useEffect, useRef } from "react";
import { Mesh, Object3D } from "three";
import { useGlobalState } from "../../store/GlobalStore";
const MainMenu = () => {
  const { switchToRacingScene, switchToCarSelectionScene } = useGlobalState();
  const mainRoadRef = useRef<Mesh>(null);
  const mainRoadTwoRef = useRef<Mesh>(null);
  const pickupTruckRef = useRef<Mesh>(null);
  const SUVRef = useRef<Mesh>(null);
  const offroadRef = useRef<Mesh>(null);
  const ferrariRef = useRef<Mesh>(null);
  const allCarsModels = [
    pickupTruckRef,
    SUVRef,
    offroadRef,
    ferrariRef
 ]
  const allCarsModelsInfo = [
    {
      name: "Pickup",
      price: 0,
      isLocked: false,
      isActive: true,
    },
    {
      name: "SUV",
      price: 200,
      isLocked: true,
      isActive: false,
    },
    {
      name: "Offroad",
      price: 500,
      isLocked: true,
      isActive: false,
    },

    {
      name: "Ferrari",
      price: 5000,
      isLocked: true,
      isActive: false,
    },
  ];
  if (!JSON.parse(localStorage.getItem("savedCarData")!)) {
    localStorage.setItem("savedCarData", JSON.stringify(allCarsModelsInfo));
  }

  let playerCar;
  let savedGameCars;
  let activatedCarIndex = 0
  useEffect(() => {
     savedGameCars = JSON.parse(localStorage.getItem("savedCarData")!);
       activatedCarIndex = savedGameCars.findIndex(
    (car) => car.isActive === true
    );

    playerCar = allCarsModels[activatedCarIndex];
    playerCar.current!.visible = true;
  }, []);

  useEffect(() => {
    mainRoadRef.current?.scale.set(0.13, 0.13, 0.13);
    mainRoadRef.current?.position.set(0, -0.4, 0);
    mainRoadTwoRef.current?.scale.set(0.13, 0.13, 0.13);
    mainRoadTwoRef.current?.position.set(0, -0.4, -15);
  }, []);

  
  useEffect(() => {
    const playButton = document.getElementById("playButton");
    const marketButton = document.getElementById("marketButton");

    if (playButton && marketButton) {
      playButton.addEventListener("click", switchToRacingScene);
      marketButton.addEventListener("click", switchToCarSelectionScene);

      return () => {
        playButton.removeEventListener("click", switchToRacingScene);
        marketButton.removeEventListener("click", switchToCarSelectionScene);
      };
    }
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
        position={[0, -0.33, 3.8]}
        visible={false}
      >
        <PickupTruck />
      </mesh>
      <mesh
        ref={SUVRef}
        rotation={[0, 20 * (Math.PI / 180), 0]}
        scale={[0.09, 0.09, 0.09]}
        position={[0, -0.33, 3.8]}
        visible={false}
      >
        <SUV />
      </mesh>
      <mesh
        ref={ferrariRef}
        rotation={[0, 20 * (Math.PI / 180), 0]}
        scale={[0.09, 0.09, 0.09]}
        position={[0, -0.33, 3.8]}
        visible={false}
      >
        <Ferrari />
      </mesh>
      <mesh
        ref={offroadRef}
        rotation={[0, 20 * (Math.PI / 180), 0]}
        scale={[0.09, 0.09, 0.09]}
        position={[0, -0.33, 3.8]}
        visible={false}
      >
        <Offroad />
      </mesh>

      <mesh
        scale={ 0.05}
        position={[-1.7, -0.33, -3]}
      >
        <BuildingBlockB />
      </mesh>
      <mesh
        scale={ 0.05}
        position={[-1.7, -0.33, 19]}
      >
        <BuildingBlockA />
      </mesh>
      <mesh
        scale={ 0.05}
        position={[1.7, -0.33, 3]}
        rotation={[0, 180 * (Math.PI / 180), 0]}
      >
        <BuildingBlockD />
      </mesh>
      
      <mesh
        scale={ 0.05}
        position={[1.7, -0.33, -16]}
        rotation={[0, 180 * (Math.PI / 180), 0]}
      >
        <BuildingBlockC />
      </mesh>
    </>
  );
};

export default MainMenu;
