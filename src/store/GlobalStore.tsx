
import React, { createContext, ReactNode, useContext, useState } from "react";


interface GameContextType {
  currentScene: "MainMenu"|"Racing"|"CarSelection"
  switchToMainMenuScene: () => void;
  switchToRacingScene: () => void;
  switchToCarSelectionScene: () => void;
}

const GlobalStateContext = createContext<GameContextType | undefined>(undefined);
GlobalStateContext.displayName = "GlobalStateContext";

export const useGlobalState = (): GameContextType => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}) => {
 
  const [currentScene, setCurrentScene] = useState<"MainMenu" | "Racing" | "CarSelection">("MainMenu");



  const switchToMainMenuScene = () => {
    setCurrentScene("MainMenu") 
    
  }

  const switchToRacingScene = () => {
   
    setCurrentScene("Racing") 
  }
  const switchToCarSelectionScene = () => {
   
    setCurrentScene("CarSelection")
    
  }

  const value: GameContextType = {
   
    switchToMainMenuScene,
    switchToRacingScene,
    switchToCarSelectionScene,
currentScene
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};
