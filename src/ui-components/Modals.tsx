import Button from "./Button";

const clicky = () => {};
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
            <Button id="resumeGame" name="Resume" handleClick={clicky} />
            <Button name="Quit" handleClick={clicky} />
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
    <Button id="pauseGame" name="||" handleClick={clicky} />
    </>
  )
}
