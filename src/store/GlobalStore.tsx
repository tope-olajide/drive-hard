import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface GameContextType {
  currentScene: "MainMenu" | "Racing" | "CarSelection" | "AssetsLoader";
  progressBar: number;
  switchToMainMenuScene: () => void;
  switchToRacingScene: () => void;
  switchToCarSelectionScene: () => void;
  increaseProgressBar: () => void;
  assetName: string;
  showAssetName: (name: string) => void;
}

const GlobalStateContext = createContext<GameContextType | undefined>(
  undefined
);
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
  const [currentScene, setCurrentScene] = useState<
    "MainMenu" | "Racing" | "CarSelection" | "AssetsLoader"
  >("AssetsLoader");

  const [progressBar, setProgressBar] = useState(5.55);
  const [assetName, setAssetName] = useState("3D Assets:=>");
  const showAssetName = (name: string) => {
    setAssetName(name);
  };
  const increaseProgressBar = () => {
    setProgressBar((prevProgressBar) => {
      return prevProgressBar + 5.55;
    });
  };
  const switchToMainMenuScene = () => {
    setCurrentScene("MainMenu");
    console.log(currentScene)
  };

  const switchToRacingScene = () => {
    setCurrentScene("Racing");
  };
  const switchToCarSelectionScene = () => {
    setCurrentScene("CarSelection");
  };

  const value: GameContextType = {
    switchToMainMenuScene,
    switchToRacingScene,
    switchToCarSelectionScene,
    currentScene,
    progressBar,
    increaseProgressBar,
    assetName,
    showAssetName,
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};
