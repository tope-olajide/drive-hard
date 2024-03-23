import { MouseEventHandler, useEffect, useState } from "react";
import { useGlobalState } from "../store/GlobalStore";

const Button = ({
  name,
  id,
  handleClick,
}: {
  name: string;
  id?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <>
      <button id={id || ""} className="button" onClick={handleClick}>
        {name}
      </button>
    </>
  );
};

export default Button;

export const PauseModal = () => {
  return (
    <>
      <section className="modal">
        <div className="modal-header">
          <h2 className="empty-space"></h2>
          <h4>Game Paused</h4>
          <h2 id="closeGamePausedModal"></h2>
        </div>
        <div className="modal-body">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button id="resumeGameButton" name="Resume" />
            <Button name="Quit" id="quitGameButton" />
          </div>
        </div>

        <div className="modal-bottom"></div>
      </section>
    </>
  );
};

export const PauseGameButton = () => {
  return (
    <>
      <Button id="pauseGameButton" name="| |" />
    </>
  );
};

export const CurrentCoinsAndScoresBoard = () => {
  return (
    <>
      <section className="current-coins-scores-container">
        <h3>
          Coins: <span className="coins-count">0</span>
        </h3>
        <h3>
          Scores:<span className="scores-count">0</span>
        </h3>
      </section>
    </>
  );
};

export const TotalCoinsAndScoresBoard = () => {
  const [highScore, setHighScore] = useState("0")
  const [totalCoins, setTotalCoins] = useState("0")
  useEffect(() => {
    const savedScore = localStorage.getItem("high-score")||"0"
    setHighScore(savedScore)

    const savedCoins = localStorage.getItem("total-coins")||"0"
    setTotalCoins(savedCoins)
  }, []);
  
  return (
    <>
      <section className="current-coins-scores-container">
        
        <h3>
          High Scores:<span className="scores-count">{highScore}</span>
        </h3>
        <h3>
          Total Coins: <span className="coins-count">{totalCoins}</span>
        </h3>
      </section>
    </>
  );
};

export const GameOverModal = () => {
 // const {setRestartGame} =
  useGlobalState();
  return (
    <>
      <section className="modal">
        <div className="modal-header">
          <h2 className="empty-space"></h2>
          <h4>Game Over!</h4>
          <h2 id="closeGamePausedModal"></h2>
        </div>
        <div className="modal-body">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button id="restartGameButton" name="Restart Game" />
            <Button name="Quit" id="quitGameButton2" />
          </div>
        </div>

        <div className="modal-bottom"></div>
      </section>
    </>
  );
};


export const CarSelectionMenu = () => {
  return (
    <>
    <section className="car-selection-container">
        <section className="car-selection-buttons">
 
      <Button name={"Prev"}  id="prevBtn" />
          <h2 className="car-name"></h2>
          <Button name={"Next"}  id="nextBtn" />
        </section>
        <button className="button" id="car-price-button">
          <span id="character-price-text"> 0</span>
    </button>
        <button className="button" id="selectCarBtn">
          <span id="select-button-text"> Select </span>
        </button>
      </section>
    </>
  )
}

export const HomeMenu = () => {
  return (
    <>
    <div className="home-menu">
        <button className="button" id="backButton">
          <span><i className="fa-solid fa-home"></i></span>Back
        </button>
      </div>
    </>
  )
}