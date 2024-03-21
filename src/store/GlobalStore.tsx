
import React, { createContext, ReactNode, useContext, useRef, MutableRefObject, useState } from "react";


interface GameContextType {
  isGamePausedRef: MutableRefObject<boolean>;
  isGameOverRef: MutableRefObject<boolean>;
  modalRef: MutableRefObject<HTMLDivElement>;
  gameOverModalRef: MutableRefObject<HTMLDivElement>;
  currentSceneRef: MutableRefObject<"MainMenu"|"Racing"|"CarSelection">;
  coins: MutableRefObject<number>;
  currentScene: "MainMenu"|"Racing"|"CarSelection"
  pauseGame: () => void;
  resumeGame: () => void;
  increaseCoins: () => void;
  setRestartGame: () => void;
  setGameOver: () => void;
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
  const isGamePausedRef = useRef<boolean>(false);
  const isGameOverRef = useRef<boolean>(false);
  let currentSceneRef = useRef<"MainMenu"|"Racing"|"CarSelection">("MainMenu");
  //  currentSceneRef.current = "MainMenu";
  const [currentScene, setCurrentScene] = useState<"MainMenu" | "Racing" | "CarSelection">("MainMenu");
  const modalRef = useRef();
  const gameOverModalRef = useRef();
  let coins = useRef(0);

  const pauseGame = () => {
    isGamePausedRef.current = true;
    modalRef.current.style.display = "block";
  };
  
  const resumeGame = () => {
    isGamePausedRef.current = false;
    modalRef.current!.style.display = "none";
  };

  const setGameOver = () => {
    isGameOverRef.current = true;
    const gameOverModalContainer = document.getElementById("gameOverModalContainer");
    if (gameOverModalContainer) {
      gameOverModalContainer.style.display = 'block'
    }
  }

  const setRestartGame = () => {
    isGameOverRef.current = false;
    const gameOverModalContainer = document.getElementById("gameOverModalContainer");
    if (gameOverModalContainer) {
      gameOverModalContainer.style.display = 'none'
    }
  }

  const increaseCoins = () => {
    coins.current += 1
    console.log(coins)
  }

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
    isGamePausedRef,
    pauseGame,
    resumeGame,
    modalRef,
    coins,
    increaseCoins,
    gameOverModalRef,
    setRestartGame,
    setGameOver,
    isGameOverRef,
    switchToMainMenuScene,
    switchToRacingScene,
    switchToCarSelectionScene,
    currentSceneRef,
currentScene
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};
