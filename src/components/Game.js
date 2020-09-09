import React, { Component } from "react";
import Player from "../Factories/Player";
import classes from "./Game.module.css";
import ComputerGrid from "./ComputerGrid/ComputerGrid";
import HumanGrid from "./HumanGrid/HumanGrid";
import Ships from "./Ships/Ships";
import WinnerModal from "./WinnerModal/WinnerModal";
import ControlButtons from "./ControlButtons/ControlButtons";
import TurnIndicator from "./TurnIndicator/TurnIndicator";

class Game extends Component {
  state = {
    human: Player("Human"),
    computer: Player("Computer"),
    currentTurn: null,
    orientation: "Horizontal",
    disableRotation: false,
    startGame: false,
    counter: 0,
    disableStartBtn: false,
    winner: null,
  };

  // When clicked on a square of the computers board
  clickBoard = (event) => {
    // Only Allow when humans turn and ships have been placed
    if (this.state.currentTurn !== "Human") {
      return;
    }
    // Stop clicking on already attacked space
    if (
      event.target.textContent === "x" ||
      event.target.style.backgroundColor === "black"
    ) {
      return;
    }
    // Attack computer board
    let newComputer = this.state.computer;
    const row = event.target.getAttribute("row");
    const column = event.target.getAttribute("column");
    if (this.state.human.attack(newComputer, row, column)) {
      this.setState({ computer: newComputer, currentTurn: "Computer" });
    }
    // If all computer ships sunk, declare human winner
    if (newComputer.gameboard.allSunk()) {
      this.setState({ winner: "Human" });
      return;
    }
    // Computer attack after 1 second delay
    setTimeout(() => {
      let newHuman = this.state.human;
      this.state.computer.computerAttack(newHuman);
      this.setState({ human: newHuman, currentTurn: "Human" });
      // If all human ships sunk, declare computer winner
      if (newHuman.gameboard.allSunk()) {
        this.setState({ winner: "Computer" });
      }
    }, 1000);
  };

  // Change orientation of ships box
  changeOrientation = () => {
    if (this.state.orientation === "Horizontal") {
      this.setState({ orientation: "Vertical" });
    } else {
      this.setState({ orientation: "Horizontal" });
    }
  };

  // When pressing start game button
  startGameHandler = () => {
    this.setState({
      currentTurn: "Human",
      disableRotation: true,
      startGame: false,
      disableStartBtn: true,
    });
    // Auto place computer ships
    this.state.computer.gameboard.autoPlaceShips();
  };

  // When pressing auto place button
  autoPlace = () => {
    this.state.human.gameboard.autoPlaceShips();

    // Stop display of draggable ships if auto placed
    let newHuman = this.state.human;
    newHuman.gameboard.ships = null;
    this.setState({ startGame: true, human: newHuman, disableRotation: true });
  };

  // Handles dragging of a ship
  handleDragStart = (event) => {
    const dragControl = () => {
      // Stop rotation while dragging;
      this.setState({ disableRotation: true });
      let ship = event.currentTarget;

      // Shift the position of mouse pointer over ship to spot clicked
      let shiftX = event.clientX - ship.getBoundingClientRect().left;
      shiftX += 0.005 * window.innerWidth;
      let shiftY = event.clientY - ship.getBoundingClientRect().top;
      shiftY += 0.005 * window.innerWidth;

      let currentDroppable = null;
      let shipName = event.target.getAttribute("name");
      let position = Number(event.target.getAttribute("position"));
      let shipLength = this.state.human.gameboard.ships[shipName].getLength();
      let finalPosition = {
        row: null,
        column: null,
      };
      let canDrop = false;
      let finalElements = [];

      // Handle move of mouse with ship attached to it
      const onMouseMove = (event) => {
        ship.style.opacity = "0.6";
        ship.style.position = "absolute";

        // Shift position of ship on page with mouse movement
        ship.style.left = event.pageX - shiftX + "px";
        ship.style.top = event.pageY - shiftY + "px";

        // Get the element below the ship to know which squares to highlight
        ship.style.display = "none";
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        ship.style.display = "grid";

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
        const row = Number(elem.getAttribute("row"));
        const column = Number(elem.getAttribute("column"));

        // Get the position of the first part of ship depending on orientation
        let firstPiece = null;
        if (this.state.orientation === "Horizontal") {
          firstPiece = column - position;
        } else {
          firstPiece = row - position;
        }

        // If ship extends over left or right side of board
        if (firstPiece <= 0 || firstPiece + shipLength - 2 >= 10) {
          return;
        }

        // Get list of elements that will be replaced with ship
        const elements = [];
        for (let i = firstPiece; i < firstPiece + shipLength; i++) {
          if (this.state.orientation === "Horizontal") {
            elements.push(
              document.querySelector(
                `[drop="droppable"][row="${row}"][column="${i}"]`
              )
            );
          } else {
            elements.push(
              document.querySelector(
                `[drop="droppable"][row="${i}"][column="${column}"]`
              )
            );
          }
        }

        // If over a ship return
        let exit = false;
        elements.forEach((element) => {
          if (element.style.backgroundColor === "gray") {
            exit = true;
          }
        });
        if (exit) return;

        elements.forEach((element) => {
          element.style.backgroundColor = "#77b4ee";
        });
        canDrop = false;
      };

      // This happens if the element is droppable on
      const enterDroppable = (elem) => {
        const row = Number(elem.getAttribute("row"));
        const column = Number(elem.getAttribute("column"));

        // Get the position of the first part of ship depending on orientation
        let firstPiece = null;
        if (this.state.orientation === "Horizontal") {
          firstPiece = column - position;
        } else {
          firstPiece = row - position;
        }

        // If ship extends over left or right side of board
        if (firstPiece <= 0 || firstPiece + shipLength - 2 >= 10) {
          return;
        }

        // Get list of elements that will be replaced with ship
        const elements = [];
        for (let i = firstPiece; i < firstPiece + shipLength; i++) {
          if (this.state.orientation === "Horizontal") {
            elements.push(
              document.querySelector(
                `[drop="droppable"][row="${row}"][column="${i}"]`
              )
            );
          } else {
            elements.push(
              document.querySelector(
                `[drop="droppable"][row="${i}"][column="${column}"]`
              )
            );
          }
        }

        // If over a ship return
        let exit = false;
        elements.forEach((element) => {
          if (element.style.backgroundColor === "gray") {
            exit = true;
          }
        });
        if (exit) return;

        // Change colour on hover
        elements.forEach((element) => {
          element.style.backgroundColor = "lightGray";
        });

        // Record where it would be dropped right now
        canDrop = true;
        finalElements = elements;
        if (this.state.orientation === "Horizontal") {
          finalPosition.row = row;
          finalPosition.column = firstPiece;
        } else {
          finalPosition.row = firstPiece;
          finalPosition.column = column;
        }
      };

      // Handle letting go of mouse button
      const onMouseUp = (event) => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        // If able to be dropped
        if (canDrop) {
          // Keep track of number of ships placed
          let counter = this.state.counter + 1;
          this.setState({ disableRotation: false, counter: counter });

          // If counter is 5 display start game button
          if (counter === 5) {
            this.setState({ startGame: true, disableRotation: true });
          }

          // Add ship to board
          ship.style.display = "none";
          this.state.human.gameboard.placeShip(
            this.state.human.gameboard.ships[shipName],
            this.state.orientation,
            finalPosition.row,
            finalPosition.column
          );

          // Set ship as placed to avoid duplicates in auto place
          let newHuman = this.state.human;
          newHuman.gameboard.ships[shipName].setPlaced();
          this.setState({ human: newHuman });

          finalElements.forEach((element) => {
            element.style.backgroundColor = "gray";
          });

          // If not dropped on board reset to previous position
        } else {
          ship.style.position = "static";
          ship.style.opacity = 1;
          this.setState({ disableRotation: false });
        }
      };

      document.addEventListener("mouseup", onMouseUp);
    };

    // Run drag function
    dragControl();
  };

  render() {
    return (
      <React.Fragment>
        <WinnerModal winner={this.state.winner} />
        <div className={classes.Container}>
          <div>
            <Ships
              dragStart={this.handleDragStart}
              orientation={this.state.orientation}
              ships={this.state.human.gameboard.ships}
              currentTurn={this.state.currentTurn}
            />
            <ControlButtons
              disableRotation={this.state.disableRotation}
              changeOrientation={this.changeOrientation}
              autoPlace={this.autoPlace}
            />
          </div>
          <div>
            <div className={classes.Label}>Human</div>
            <div className={classes.Grid}>
              <HumanGrid grid={this.state.human.gameboard.getGrid()} />
            </div>
          </div>
          <div>
            <div className={classes.Label}>Computer</div>
            <div className={classes.Grid}>
              <ComputerGrid
                grid={this.state.computer.gameboard.getGrid()}
                clickBoard={(event) => this.clickBoard(event)}
              />
            </div>
          </div>
        </div>
        <TurnIndicator
          startGame={this.state.startGame}
          startGameHandler={this.startGameHandler}
          currentTurn={this.state.currentTurn}
        />
      </React.Fragment>
    );
  }
}

export default Game;
