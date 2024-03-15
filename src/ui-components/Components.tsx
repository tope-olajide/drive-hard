import { MouseEventHandler } from "react";
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
            <Button name="Quit" />
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
            <Button name="Quit" />
          </div>
        </div>

        <div className="modal-bottom"></div>
      </section>
    </>
  );
};
