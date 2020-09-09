import React from "react";
import classes from "./TurnIndicator.module.css";

const turnIndicator = (props) => {
  // Turn indicator dependant on start of game
  let turnIndicator = null;
  if (props.startGame) {
    turnIndicator = (
      <button onClick={props.startGameHandler}>Start Game</button>
    );
  } else if (props.currentTurn) {
    turnIndicator = <button disabled>Go: {props.currentTurn}</button>;
  }

  return <div className={classes.Turn}>{turnIndicator}</div>;
};

export default turnIndicator;
