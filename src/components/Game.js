import React, { Component } from "react";
import Player from "../Factories/Player";
import classes from "./Game.module.css";
import ComputerGrid from "./ComputerGrid/ComputerGrid";
import HumanGrid from "./HumanGrid/HumanGrid";

class Game extends Component {
  state = {
    human: Player("human"),
    computer: Player("computer"),
  };

  clickBoard = (event) => {
    console.log(event.target);
  };

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Ships}>Ships</div>
        <div className={classes.Grid}>
          <HumanGrid
            grid={this.state.human.gameboard.grid}
          />
        </div>
        <div className={classes.Grid}>
          <ComputerGrid
            grid={this.state.computer.gameboard.grid}
            clickBoard={(event) => this.clickBoard(event)}
          />
        </div>
      </div>
    );
  }
}

export default Game;
