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
  SkyBox,
} from "../../GLTFModelsLoader";
import { Suspense, useEffect, useRef } from "react";
import { Mesh, Object3D } from "three";
import { useGlobalState } from "../../store/GlobalStore";
import AssetsLoader from "../../AssetsLoader";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import {
  Ambulance,
  Bus,
  Coin,
  Firetruck,
  Limousine,
  Taxi,
  Van,
} from "../../FBXModelLoader";
const PreloadAssets = () => {
  const { switchToRacingScene, switchToCarSelectionScene } = useGlobalState();

  return (
    <>
      <mesh scale={0} position={0} visible={false}>
        <Suspense fallback={<AssetsLoader assetName="MainRoad" />}>
          <MainRoad />
        </Suspense>
      </mesh>

      <mesh scale={0} position={0} visible={false}>
        <Suspense fallback={<AssetsLoader assetName="Pickup Truck" />}>
          <PickupTruck />
        </Suspense>
      </mesh>
      <mesh scale={0} position={0} visible={false}>
        <Suspense fallback={<AssetsLoader assetName="SUV" />}>
          <SUV />
        </Suspense>
      </mesh>
      <mesh scale={0} position={0} visible={false}>
        <Suspense fallback={<AssetsLoader assetName="Ferrari" />}>
          <Ferrari />
        </Suspense>
      </mesh>
      <mesh scale={0} position={0} visible={false}>
        <Suspense fallback={<AssetsLoader assetName="Offroad" />}>
          <Offroad />
        </Suspense>
      </mesh>

      <mesh scale={0} position={0} visible={false}>
        <Suspense fallback={<AssetsLoader assetName=" Building Block B" />}>
          <BuildingBlockB />
        </Suspense>
      </mesh>
      <mesh scale={0} position={0} visible={false}>
        <Suspense fallback={<AssetsLoader assetName="Building Block A" />}>
          <BuildingBlockA />
        </Suspense>
      </mesh>
      <mesh scale={0} position={0} visible={false}>
        <Suspense fallback={<AssetsLoader assetName="Building Block D" />}>
          <BuildingBlockD />
        </Suspense>
      </mesh>

      <mesh scale={0} position={0} visible={false}>
        <Suspense fallback={<AssetsLoader assetName=" Building Block C" />}>
          <BuildingBlockC />
        </Suspense>
      </mesh>
      <mesh scale={0} position={0} visible={false}>
        <Suspense fallback={<AssetsLoader assetName="SkyBox" />}>
          <SkyBox />
        </Suspense>
      </mesh>
      <mesh scale={0} position={0} visible={false}>
        <Suspense fallback={<AssetsLoader assetName="Taxi" />}>
          <Taxi />
        </Suspense>
      </mesh>
      <mesh scale={0} position={0} visible={false}>
        <Suspense fallback={<AssetsLoader assetName="BRT" />}>
          <Bus />
        </Suspense>
      </mesh>
      <mesh scale={0} position={0} visible={false}>
        <Suspense fallback={<AssetsLoader assetName="Firetruck" />}>
          <Firetruck />
        </Suspense>
      </mesh>
      <mesh scale={0} position={0} visible={false}>
        <Suspense fallback={<AssetsLoader assetName="Van" />}>
          <Van />
        </Suspense>
      </mesh>
      <mesh scale={0} position={0} visible={false}>
        <Suspense fallback={<AssetsLoader assetName="Ambulance" />}>
          <Ambulance />
        </Suspense>
      </mesh>
      <mesh scale={0} position={0} visible={false}>
        <Suspense fallback={<AssetsLoader assetName="Coin" />}>
          <Coin />
        </Suspense>
      </mesh>
      <mesh scale={0} position={0} visible={false}>
        <Suspense fallback={<AssetsLoader assetName="Limousine" />}>
          <Limousine />
        </Suspense>
      </mesh>
    </>
  );
};

export default PreloadAssets;
