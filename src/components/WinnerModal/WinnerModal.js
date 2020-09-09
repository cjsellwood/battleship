import React from "react";
import classes from "./WinnerModal.module.css";

const winnerModal = (props) => {
  // Show or hide winner modal
  let winnerStyle = null;
  if (props.winner) {
    winnerStyle = { top: "0vh" };
  }

  return (
    <div className={classes.Winner} style={winnerStyle}>
      <div>{props.winner} Wins</div>
      <button onClick={() => window.location.reload()}>Restart</button>
    </div>
  );
};

export default winnerModal;
