import CarRaceScene from "./scenes/Race";
import MainMenuScene from "./scenes/MainMenu";
import CarSelectionScene from "./scenes/CarSelection";

import { useGlobalState } from "./store/GlobalStore";
import { Canvas } from "@react-three/fiber";

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
  return (
    <>
      
      
      <ambientLight intensity={4} color="blue" />
        <directionalLight intensity={5} color="white" position={[0, 0.4, 1]} />
          <MainMenuScene />
        
    </>
  );
}

export default App;
