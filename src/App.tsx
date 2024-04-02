
import MainMenuScene from "./scenes/MainMenu";
import CarSelectionScene from "./scenes/CarSelection";

import { useGlobalState } from "./store/GlobalStore";

import PreloadAssetsScene from "./scenes/PreloadAssets";
import CarRaceScene from "./scenes/CarRace";

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
    <PreloadAssetsScene />
    </>
  );
}

export default App;
