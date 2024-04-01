import CarRaceScene from "./scenes/Race";
import MainMenuScene from "./scenes/MainMenu";
import CarSelectionScene from "./scenes/CarSelection";

import { useGlobalState } from "./store/GlobalStore";
import AssetsLoader from "./AssetsLoader";
import { Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Ferrari } from "./GLTFModelsLoader";
import PreloadAssets from "./scenes/PreloadAssets";

function App() {
  const { currentScene } = useGlobalState();

  if (currentScene === "CarSelection") {
    return (
      <>
        <CarSelectionScene />
      </>
    );
  }
  if (currentScene === "Racing") {
    return (
      <>
        <CarRaceScene />
      </>
    );
  }
  if (currentScene === "MainMenu") {
    return (
      <>
        <MainMenuScene />
      </>
    );
  }
  return (
    <>
    <PreloadAssets />
    </>
  );
}

export default App;
