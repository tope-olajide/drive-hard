import CarRaceScene from "./scenes/Race";
import MainMenuScene from "./scenes/MainMenu";
import CarSelectionScene from "./scenes/CarSelection";

import { useGlobalState } from "./store/GlobalStore";


//const audio = new Audio('./energetic-rock-trailer-140906')



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
      
          <MainMenuScene />
        
    </>
  );
}

export default App;
