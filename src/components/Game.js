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
    orientation: "Horizontal",
    dragX: null,
    dragY: null,
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

  changeOrientation = () => {
    if (this.state.orientation === "Horizontal") {
      this.setState({ orientation: "Vertical" });
    } else {
      this.setState({ orientation: "Horizontal" });
    }
  };

  handleDragStart = (event) => {
    console.log(event.target);
    console.log(event.currentTarget);
    let ship = event.currentTarget;
    ship.style.position = "absolute";
    let shiftX = event.clientX - ship.getBoundingClientRect().left;
    let shiftY = event.clientY - ship.getBoundingClientRect().top;
    console.log(shiftX, shiftY);

    document.addEventListener("mousemove", (event) => {
      console.log(event.clientX);
      console.log(event.pageX);
      ship.style.left = event.pageX - 20 - shiftX + "px";
      ship.style.top = event.pageY + 20 - shiftY + "px";
    });
  };

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className={classes.Container}>
          <div>
            <Ships
              dragStart={this.handleDragStart}
              orientation={this.state.orientation}
              ships={this.state.human.gameboard.ships}
            />
            <button onClick={() => this.changeOrientation()}>Rotate</button>
          </div>
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
