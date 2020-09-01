import React, { Component } from "react";
import Player from "../Factories/Player";
import classes from "./Game.module.css";
import ComputerGrid from "./ComputerGrid/ComputerGrid";
import HumanGrid from "./HumanGrid/HumanGrid";

class Game extends Component {
  state = {
    human: Player("human"),
    computer: Player("computer"),
    currentTurn: "human",
  };

  // When clicked on a square of the computers board
  clickBoard = (event) => {
    // Only Allow when humans turn
    if (this.state.currentTurn !== "human") {
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
      this.setState({ computer: newComputer, currentTurn: "computer" });
    }
    setTimeout(() => {
      let newHuman = this.state.human;
      this.state.computer.computerAttack(newHuman);
      this.setState({ human: newHuman, currentTurn: "human" });
    }, 1000);
  };

  render() {
    const createShips = [];
    this.state.human.gameboard.ships.forEach((ship) => {
      let squares = [];
      for (let i = 0; i < ship.length; i++) {
        squares.push(<div></div>);
      }
      createShips.push(<div>{squares}</div>);
    })
    return (
      <React.Fragment>
        <div className={classes.Container}>
          <div className={classes.Ships}>{createShips}</div>
          <div className={classes.Grid}>
            <HumanGrid grid={this.state.human.gameboard.grid} />
          </div>
          <div className={classes.Grid}>
            <ComputerGrid
              grid={this.state.computer.gameboard.grid}
              clickBoard={(event) => this.clickBoard(event)}
            />
          </div>
        </div>
        <div className={classes.Turn}>{this.state.currentTurn}</div>
      </React.Fragment>
    );
  }
}

export default Game;
