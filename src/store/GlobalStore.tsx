
import React, { createContext, ReactNode, useContext, useRef, MutableRefObject } from "react";


interface GameContextType {
  isGamePausedRef: MutableRefObject<boolean>;
  modalRef: MutableRefObject<HTMLDivElement>;
  coins: MutableRefObject<number>;
  pauseGame: () => void;
  resumeGame: () => void;
  increaseCoins: () => void;
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
  const modalRef = useRef();
  let coins = useRef(0);


  const pauseGame = () => {
    isGamePausedRef.current = true;
    console.log(isGamePausedRef.current);
    modalRef.current.style.display = "block";
   // clock.stop()
  };
  
  const resumeGame = () => {
    isGamePausedRef.current = false;
    modalRef.current!.style.display = "none";
  };

  const increaseCoins = () => {
    coins.current += 1
    console.log(coins)
  }

  const value: GameContextType = {
    isGamePausedRef,
    pauseGame,
    resumeGame,
    modalRef,
    coins,
    increaseCoins,
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};
