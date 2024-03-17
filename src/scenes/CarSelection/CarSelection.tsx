import { useFrame } from "@react-three/fiber";
import {
  MainRoad,
  MainRoadTwo,
  PickupTruck,
  Ferrari,
  Offroad,
  SUV,
} from "../../GLTFModelsLoader";
import { Sporty } from "../../FBXModelLoader";
import { useEffect, useRef } from "react";
import { Mesh } from "three";

const CarSelection = () => {
  const mainRoadRef = useRef<Mesh>(null);
  const mainRoadTwoRef = useRef<Mesh>(null);
  const pickupTruckRef = useRef<Mesh>(null);
  const SUVRef = useRef<Mesh>(null);
  const offroadRef = useRef<Mesh>(null);
  const ferrariRef = useRef<Mesh>(null);
  const sportyRef = useRef<Mesh>(null);

  const allCars = [
    {
      carModel: pickupTruckRef,
      name: "Pickup",
      price: 0,
      isLocked: false,
      isActive: true,
    },
    {
      carModel: SUVRef,
      name: "SUV",
      price: 200,
      isLocked: true,
      isActive: false,
    },
    {
      carModel: offroadRef,
      name: "Offroad",
      price: 500,
      isLocked: true,
      isActive: false,
    },
    {
      carModel: sportyRef,
      name: "Sporty",
      price: 2000,
      isLocked: true,
      isActive: false,
    },
    {
      carModel: ferrariRef,
      name: "Ferrari",
      price: 5000,
      isLocked: true,
      isActive: false,
    },
  ];
  let currentCarIndex = 0;
  let currentCar = allCars[currentCarIndex].carModel;
  (document.querySelector(".car-name") as HTMLElement).innerHTML =
    allCars[currentCarIndex].name;

  useEffect(() => {
    mainRoadRef.current?.scale.set(0.13, 0.13, 0.13);
    mainRoadRef.current?.position.set(0, -0.4, 0);
    mainRoadTwoRef.current?.scale.set(0.13, 0.13, 0.13);
    mainRoadTwoRef.current?.position.set(0, -0.4, -15);

    /*  pickupTruckRef.current?.scale.set(0.09, 0.09, 0.09); 
    pickupTruckRef.current?.position.set(0, -0.33, 3.8);*/
  }, []);

  const nextCar = () => {
    if (currentCarIndex + 1 < allCars.length) {
      currentCarIndex += 1;
      console.log(currentCarIndex);
      currentCar.current!.visible = false;
      currentCar = allCars[currentCarIndex].carModel;
      currentCar.current!.visible = true;
      (document.querySelector(".car-name") as HTMLElement).innerHTML =
        allCars[currentCarIndex].name;
        if (allCars[currentCarIndex].isLocked) {
          (
            document.getElementById("selectCarBtn") as HTMLElement
          ).style.display = "none";
          (
            document.getElementById("car-price-button") as HTMLElement
          ).style.display = "block";
          (
            document.getElementById("character-price-text") as HTMLElement
          ).innerHTML = `${allCars[currentCarIndex].price}`;
      }
      
      if (allCars[currentCarIndex].isActive) {
        (
          document.getElementById("selectCarBtn") as HTMLElement
        ).style.display = "block";
        (
          document.getElementById("car-price-button") as HTMLElement
        ).style.display = "none";
        (
          document.getElementById("select-button-text") as HTMLElement
        ).innerHTML = "Selected";
      }

      if (
        !allCars[currentCarIndex].isLocked &&
        !allCars[currentCarIndex].isActive
      ) {
        (
          document.getElementById("selectCarBtn") as HTMLElement
        ).style.display = "block";
        (
          document.getElementById("car-price-button") as HTMLElement
        ).style.display = "none";
        (
          document.getElementById("select-button-text") as HTMLElement
        ).innerText = "Select";
      }

    }
  };

  const previousCar = () => {
    if (currentCarIndex != 0) {
      currentCarIndex -= 1;
      console.log(currentCarIndex);
      currentCar.current!.visible = false;
      currentCar = allCars[currentCarIndex].carModel;
      currentCar.current!.visible = true;
      (document.querySelector(".car-name") as HTMLElement).innerHTML =
        allCars[currentCarIndex].name;
        if (allCars[currentCarIndex].isLocked) {
          (
            document.getElementById("selectCarBtn") as HTMLElement
          ).style.display = "none";
          (
            document.getElementById("car-price-button") as HTMLElement
          ).style.display = "block";
          (
            document.getElementById("character-price-text") as HTMLElement
          ).innerHTML = `${allCars[currentCarIndex].price}`;
      }
      
      if (allCars[currentCarIndex].isActive) {
        (
          document.getElementById("selectCarBtn") as HTMLElement
        ).style.display = "block";
        (
          document.getElementById("car-price-button") as HTMLElement
        ).style.display = "none";
        (
          document.getElementById("select-button-text") as HTMLElement
        ).innerHTML = "Selected";
      }

      if (
        !allCars[currentCarIndex].isLocked &&
        !allCars[currentCarIndex].isActive
      ) {
        (
          document.getElementById("selectCarBtn") as HTMLElement
        ).style.display = "block";
        (
          document.getElementById("car-price-button") as HTMLElement
        ).style.display = "none";
        (
          document.getElementById("select-button-text") as HTMLElement
        ).innerText = "Select";
      }
    }
  };

  useEffect(() => {
    const nextButton = document.getElementById("nextBtn");
    const previousButton = document.getElementById("prevBtn");

    if (nextButton && previousButton) {
      nextButton.addEventListener("click", nextCar);
      previousButton.addEventListener("click", previousCar);

      return () => {
        nextButton.removeEventListener("click", nextCar);
        previousButton.removeEventListener("click", previousCar);
      };
    }
  }, []);
  useEffect(() => {
    if (allCars[currentCarIndex].isLocked) {
      (
        document.getElementById("selectCarBtn") as HTMLElement
      ).style.display = "none";
      (
        document.getElementById("car-price-button") as HTMLElement
      ).style.display = "block";
      (
        document.getElementById("character-price-text") as HTMLElement
      ).innerHTML = `${allCars[currentCarIndex].price}`;
  }
  
  if (allCars[currentCarIndex].isActive) {
    (
      document.getElementById("selectCarBtn") as HTMLElement
    ).style.display = "block";
    (
      document.getElementById("car-price-button") as HTMLElement
    ).style.display = "none";
    (
      document.getElementById("select-button-text") as HTMLElement
    ).innerHTML = "Selected";
  }

  if (
    !allCars[currentCarIndex].isLocked &&
    !allCars[currentCarIndex].isActive
  ) {
    (
      document.getElementById("selectCarBtn") as HTMLElement
    ).style.display = "block";
    (
      document.getElementById("car-price-button") as HTMLElement
    ).style.display = "none";
    (
      document.getElementById("select-button-text") as HTMLElement
    ).innerText = "Select";
  }
  }, []);

  useFrame((state, delta) => {
    if (currentCar.current) {
      currentCar.current.rotation.y += 1 * delta;
    }
  });

  return (
    <>
      <mesh ref={mainRoadRef}>
        <MainRoad />
      </mesh>
      <mesh ref={mainRoadTwoRef}>
        <MainRoadTwo />
      </mesh>
      <mesh ref={pickupTruckRef} position={[0, -0.33, 3.8]} scale={0.09}>
        <PickupTruck />
      </mesh>
      <mesh
        ref={sportyRef}
        position={[0, -0.33, 3.8]}
        scale={0.0006}
        visible={false}
      >
        <Sporty />
      </mesh>
      <mesh
        ref={SUVRef}
        position={[0, -0.33, 3.8]}
        scale={0.09}
        visible={false}
      >
        <SUV />
      </mesh>
      <mesh
        ref={ferrariRef}
        position={[0, -0.33, 3.8]}
        scale={0.09}
        visible={false}
      >
        <Ferrari />
      </mesh>
      <mesh
        ref={offroadRef}
        position={[0, -0.33, 3.8]}
        scale={0.09}
        visible={false}
      >
        <Offroad />
      </mesh>
    </>
  );
};

export default CarSelection;
