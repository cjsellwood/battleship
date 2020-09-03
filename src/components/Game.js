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
    disableRotation: false,
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
    if (this.state.disableRotation === true) {
      return;
    }
    if (this.state.orientation === "Horizontal") {
      this.setState({ orientation: "Vertical" });
    } else {
      this.setState({ orientation: "Horizontal" });
    }
  };

  // Handles dragging of ship
  handleDragStart = (event) => {
    // Stop rotation while dragging;
    this.setState({ disableRotation: true });
    console.log(event.target);
    console.log(event.currentTarget);
    let ship = event.currentTarget;

    // console.log(event.pageX, event.pageY);
    // console.log(event.clientX, event.clientY);
    let shiftX = event.clientX - ship.getBoundingClientRect().left;
    let shiftY = event.clientY - ship.getBoundingClientRect().top;
    // console.log(shiftX, shiftY);

    // Handle move of mouse with ship attached to it
    let currentDroppable = null;
    let shipName = event.target.getAttribute("name");
    let position = event.target.getAttribute("position");
    let shipLength = this.state.human.gameboard.ships[shipName].getLength();
    const onMouseMove = (event) => {
      ship.style.position = "absolute";
      ship.style.left = event.pageX - shiftX - 10 + "px";
      ship.style.top = event.pageY - shiftY - 10 + "px";

      ship.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      ship.hidden = false;
      // Stop from being dropped outside window
      if (!elemBelow) return;

      // Find closest element marked droppable
      let droppableBelow = elemBelow.closest("[drop=droppable]");

      if (currentDroppable !== droppableBelow) {
        // Make sure that ship can go in that position
        if (currentDroppable) {
          leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          enterDroppable(currentDroppable);
        }
      }
    };
    document.addEventListener("mousemove", onMouseMove);

    const leaveDroppable = (elem) => {
      elem.style.background = "rgb(161, 202, 255)";
    };

    const enterDroppable = (elem) => {
      const row = elem.getAttribute("row");
      const column = elem.getAttribute("column");
      console.log("row", row);
      console.log("column", column);
      console.log("ship-part", position);
      console.log("ship name", shipName);
      console.log("ship length", shipLength);
      elem.style.backgroundColor = "lightGray";
    };

    // Handle letting go of mouse button
    const onMouseUp = (event) => {
      document.removeEventListener("mousemove", onMouseMove);
      this.setState({ disableRotation: false });
      document.removeEventListener("mouseup", onMouseUp);
      //ship.style.display = "none";
      return;
    };
    document.addEventListener("mouseup", onMouseUp);
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
            {!this.state.disableRotation ? (
              <button onClick={() => this.changeOrientation()}>Rotate</button>
            ) : null}
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
