import { useRef } from "react";
import { Mesh } from "three";

const pickupTruckRef = useRef<Mesh>(null);
  const SUVRef = useRef<Mesh>(null);
  const offroadRef = useRef<Mesh>(null);
  const ferrariRef = useRef<Mesh>(null);

export  const allCars = [
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
      carModel: ferrariRef,
      name: "Ferrari",
      price: 5000,
      isLocked: true,
      isActive: false,
    },
  ];