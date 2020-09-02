import React, { Component } from "react";
import Player from "../Factories/Player";
import classes from "./Game.module.css";
import ComputerGrid from "./ComputerGrid/ComputerGrid";
import HumanGrid from "./HumanGrid/HumanGrid";
import Ships from "./Ships/Ships";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

class Game extends Component {
  state = {
    human: Player("Human"),
    computer: Player("Computer"),
    currentTurn: "Human",
  };

  // When clicked on a square of the computers board
  clickBoard = (event) => {
    // Only Allow when humans turn
    if (this.state.currentTurn !== "Human") {
      return;
    }
    // Stop clicking on already attacked space
    if (event.target.textContent === "x") {
      return;
    }
    console.log(event);
    let newComputer = this.state.computer;
    const row = event.target.getAttribute("row");
    const column = event.target.getAttribute("column");
    if (this.state.human.attack(newComputer, row, column)) {
      this.setState({ computer: newComputer, currentTurn: "Computer" });
    }
    setTimeout(() => {
      let newHuman = this.state.human;
      this.state.computer.computerAttack(newHuman);
      this.setState({ human: newHuman, currentTurn: "Human" });
    }, 1000);
  };

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className={classes.Container}>
          <Ships ships={this.state.human.gameboard.ships} />
          <div>
            <div className={classes.Label}>Human</div>
            <div className={classes.Grid}>
              <HumanGrid grid={this.state.human.gameboard.grid} />
            </div>
          </div>
          <div>
            <div className={classes.Label}>Computer</div>
            <div className={classes.Grid}>
              <ComputerGrid
                grid={this.state.computer.gameboard.grid}
                clickBoard={(event) => this.clickBoard(event)}
              />
            </div>
          </div>
        </div>
        <div className={classes.Turn}>Go: {this.state.currentTurn}</div>
      </DndProvider>
    );
  }
}

export default Game;
