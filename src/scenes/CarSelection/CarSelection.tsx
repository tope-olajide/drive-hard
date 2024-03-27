import { useFrame } from "@react-three/fiber";
import {
  MainRoad,
  MainRoadTwo,
  PickupTruck,
  Ferrari,
  Offroad,
  SUV,
} from "../../GLTFModelsLoader";
import { useEffect, useRef } from "react";
import { Mesh } from "three";
import { useGlobalState } from "../../store/GlobalStore";

const CarSelection = () => {

  const { switchToMainMenuScene } = useGlobalState()
  
  
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
 
  let currentCarIndex = 0;
  let savedGameCars = JSON.parse(localStorage.getItem("savedCarData")!);
  let currentCar = allCarsModels[currentCarIndex];
  (document.querySelector(".car-name") as HTMLElement).innerHTML =
    savedGameCars[currentCarIndex].name;

 
  useEffect(() => {
    mainRoadRef.current?.scale.set(0.13, 0.13, 0.13);
    mainRoadRef.current?.position.set(0, -0.4, 0);
    mainRoadTwoRef.current?.scale.set(0.13, 0.13, 0.13);
    mainRoadTwoRef.current?.position.set(0, -0.4, -15);

  }, []);

  useEffect(() => {
    const homeButton = document.getElementById("backButton");
    const priceButton = document.getElementById("car-price-button");
    const selectCarButton = document.getElementById("selectCarBtn");
 
     if (homeButton && priceButton && selectCarButton ){
      homeButton.addEventListener("click", switchToMainMenuScene);
      priceButton.addEventListener("click", purchaseCar);
      selectCarButton.addEventListener("click", activateCar);
 
       return () => {
        homeButton.removeEventListener("click", switchToMainMenuScene);
        priceButton.removeEventListener("click", purchaseCar);
      selectCarButton.removeEventListener("click", activateCar);
         
       };
     }
   }, []);

  const nextCar = () => {
    if (currentCarIndex + 1 < savedGameCars.length) {
      currentCarIndex += 1;
      console.log(currentCarIndex);
      currentCar.current!.visible = false;
      currentCar = allCarsModels[currentCarIndex];
      currentCar.current!.visible = true;
      (document.querySelector(".car-name") as HTMLElement).innerHTML =
        savedGameCars[currentCarIndex].name;
        if (savedGameCars[currentCarIndex].isLocked) {
          (
            document.getElementById("selectCarBtn") as HTMLElement
          ).style.display = "none";
          (
            document.getElementById("car-price-button") as HTMLElement
          ).style.display = "block";
          (
            document.getElementById("character-price-text") as HTMLElement
          ).innerHTML = `${savedGameCars[currentCarIndex].price}`;
      }
      
      if (savedGameCars[currentCarIndex].isActive) {
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
        !savedGameCars[currentCarIndex].isLocked &&
        !savedGameCars[currentCarIndex].isActive
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
      currentCar = allCarsModels[currentCarIndex];
      currentCar.current!.visible = true;
      (document.querySelector(".car-name") as HTMLElement).innerHTML =
        savedGameCars[currentCarIndex].name;
        if (savedGameCars[currentCarIndex].isLocked) {
          (
            document.getElementById("selectCarBtn") as HTMLElement
          ).style.display = "none";
          (
            document.getElementById("car-price-button") as HTMLElement
          ).style.display = "block";
          (
            document.getElementById("character-price-text") as HTMLElement
          ).innerHTML = `${savedGameCars[currentCarIndex].price}`;
      }
      
      if (savedGameCars[currentCarIndex].isActive) {
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
        !savedGameCars[currentCarIndex].isLocked &&
        !savedGameCars[currentCarIndex].isActive
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

  const activateCar = () => {
    const savedCarData = JSON.parse(
      localStorage.getItem("savedCarData")!
    );
    console.log(savedCarData)
    const updatedCarData = savedCarData.map((playerInfo, index: number) => {
      if (currentCarIndex === index) {
        return {
          ...playerInfo,
          isActive: true,
          price: 0,
          isLocked: false,
        };
      }
      return { ...playerInfo, isActive: false };
    });
    localStorage.setItem("savedCarData", JSON.stringify(updatedCarData));
    savedGameCars = updatedCarData;
    
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

  const purchaseCar = () => {
    const totalCoins = Number(localStorage.getItem("total-coins"));
    if (totalCoins >= savedGameCars[currentCarIndex].price) {
      const remainingCoins =
        totalCoins - Number(savedGameCars[currentCarIndex].price);
      localStorage.setItem("total-coins", remainingCoins.toString()!);
      activateCar();
      (
      document.querySelector(".coins-count") as HTMLElement
    ).innerHTML = `${remainingCoins}`;
    }
  }

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
    if (savedGameCars[currentCarIndex].isLocked) {
      (
        document.getElementById("selectCarBtn") as HTMLElement
      ).style.display = "none";
      (
        document.getElementById("car-price-button") as HTMLElement
      ).style.display = "block";
      (
        document.getElementById("character-price-text") as HTMLElement
      ).innerHTML = `${savedGameCars[currentCarIndex].price}`;
  }
  
  if (savedGameCars[currentCarIndex].isActive) {
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
    !savedGameCars[currentCarIndex].isLocked &&
    !savedGameCars[currentCarIndex].isActive
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
