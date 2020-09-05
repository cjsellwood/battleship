import React, { Component } from "react";
import Player from "../Factories/Player";
import classes from "./Game.module.css";
import ComputerGrid from "./ComputerGrid/ComputerGrid";
import HumanGrid from "./HumanGrid/HumanGrid";
import Ships from "./Ships/Ships";

class Game extends Component {
  state = {
    human: Player("Human"),
    computer: Player("Computer"),
    currentTurn: null,
    orientation: "Vertical",
    disableRotation: false,
    startGame: false,
    counter: 0,
    disableStartBtn: false,
  };

  // When clicked on a square of the computers board
  clickBoard = (event) => {
    // Only Allow when humans turn and ships have been placed
    if (this.state.currentTurn !== "Human") {
      return;
    }
    // Stop clicking on already attacked space
    if (event.target.textContent === "x") {
      return;
    }
    //console.log(event);
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

  startGame = () => {
    this.setState({
      currentTurn: "Human",
      disableRotation: true,
      startGame: false,
      disableStartBtn: true,
    });
    // Auto place computer ships
    this.state.computer.gameboard.autoPlaceShips();
  };

  autoPlace = () => {
    console.log("Auto place");
    this.state.human.gameboard.autoPlaceShips();
    console.log(this.state.human.gameboard.getGrid());

    // Stop display of draggable ships if auto placed
    let newHuman = this.state.human;
    newHuman.gameboard.ships = null; 
    this.setState({ startGame: true, human: newHuman, disableRotation: true });
  };

  // Handles dragging of a ship
  handleDragStart = (event) => {
    const horizontalDrag = () => {
      // Stop rotation while dragging;
      this.setState({ disableRotation: true });
      console.log(event.target);
      console.log(event.currentTarget);
      let ship = event.currentTarget;

      let shiftX = event.clientX - ship.getBoundingClientRect().left;
      let shiftY = event.clientY - ship.getBoundingClientRect().top;

      // Handle move of mouse with ship attached to it
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
      //console.log(window.innerHeight, window.innerWidth);

      const onMouseMove = (event) => {
        ship.style.opacity = "0.7";
        ship.style.position = "absolute";
        ship.style.outline = "2px solid white";
        ship.style.left =
          event.pageX - shiftX - 0.01 * window.innerWidth - 1 + "px";
        ship.style.top =
          event.pageY - shiftY - 0.01 * window.innerWidth - 1 + "px";

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
        const row = Number(elem.getAttribute("row"));
        const column = Number(elem.getAttribute("column"));
        const firstPiece = row - position;
        console.log("row", row);
        console.log("column", column);
        console.log("position", position);
        console.log("ship name", shipName);
        console.log("ship length", shipLength);
        console.log("first piece", firstPiece);

        // If ship extends over left or right side of board
        if (firstPiece <= 0 || firstPiece + shipLength - 2 >= 10) {
          return;
        }

        // Get list of elements that will be replaced with ship
        const elements = [];
        for (let i = firstPiece; i < firstPiece + shipLength; i++) {
          elements.push(
            document.querySelector(
              `[drop="droppable"][row="${i}"][column="${column}"]`
            )
          );
        }

        // If over a ship return
        let exit = false;
        elements.forEach((element) => {
          console.log(element.style.backgroundColor);
          if (element.style.backgroundColor === "gray") {
            exit = true;
          }
        });
        if (exit) return;

        elements.forEach((element) => {
          element.style.backgroundColor = "rgb(161, 202, 255)";
        });
        canDrop = false;
      };

      // This happens if the element is droppable on
      const enterDroppable = (elem) => {
        const row = Number(elem.getAttribute("row"));
        const column = Number(elem.getAttribute("column"));
        const firstPiece = row - position;
        console.log("row", row);
        console.log("column", column);
        console.log("position", position);
        console.log("ship name", shipName);
        console.log("ship length", shipLength);
        console.log("first piece", firstPiece);

        // If ship extends over left or right side of board
        if (firstPiece <= 0 || firstPiece + shipLength - 2 >= 10) {
          return;
        }

        // Get list of elements that will be replaced with ship
        const elements = [];
        for (let i = firstPiece; i < firstPiece + shipLength; i++) {
          elements.push(
            document.querySelector(
              `[drop="droppable"][row="${i}"][column="${column}"]`
            )
          );
        }

        // If over a ship return
        let exit = false;
        elements.forEach((element) => {
          console.log(element.style.backgroundColor);
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
        finalPosition.row = firstPiece;
        finalPosition.column = column;
      };

      // Handle letting go of mouse button
      const onMouseUp = (event) => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        if (canDrop) {
          let counter = this.state.counter + 1;
          if (counter === 5) {
            this.setState({ startGame: true });
          }
          this.setState({ disableRotation: false, counter: counter });
          console.log(finalPosition.row, finalPosition.column);
          ship.style.display = "none";
          this.state.human.gameboard.placeShip(
            this.state.human.gameboard.ships[shipName],
            this.state.orientation,
            finalPosition.column,
            finalPosition.row
          );

          // Set ship as placed 
          let newHuman = this.state.human;
          newHuman.gameboard.ships[shipName].setPlaced();
          this.setState({human: newHuman})

          console.log(finalElements);
          finalElements.forEach((element) => {
            element.style.backgroundColor = "gray";
          });

          // If not dropped on board reset to previous position
        } else {
          ship.style.position = "static";
          ship.style.opacity = 1;
          this.setState({ disableRotation: false });
        }
        //console.log(this.state.human.gameboard.getGrid())
        return;
      };

      document.addEventListener("mouseup", onMouseUp);
    };

    const verticalDrag = () => {
      // Stop rotation while dragging;
      this.setState({ disableRotation: true });
      console.log(event.target);
      console.log(event.currentTarget);
      let ship = event.currentTarget;

      let shiftX = event.clientX - ship.getBoundingClientRect().left;
      let shiftY = event.clientY - ship.getBoundingClientRect().top;

      // Handle move of mouse with ship attached to it
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

      const onMouseMove = (event) => {
        ship.style.opacity = "0.7";
        ship.style.position = "absolute";
        ship.style.outline = "2px solid white";

        // Actually up and down due to rotation
        ship.style.bottom =
          event.pageX - shiftX - 0.01 * window.innerWidth - 1 + "px";
        ship.style.right =
          event.pageY - shiftY - 0.01 * window.innerWidth - 1 + "px";

        //Good
        //ship.style.top = event.pageX - shiftX - 0.01 * window.innerWidth - 1 + "px";

        // console.log("pageY", -event.pageY)
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
        const row = Number(elem.getAttribute("row"));
        const column = Number(elem.getAttribute("column"));
        const firstPiece = row - position;
        //  console.log("row", row);
        //  console.log("column", column);
        //  console.log("position", position);
        //  console.log("ship name", shipName);
        //  console.log("ship length", shipLength);
        //  console.log("first piece", firstPiece);

        // If ship extends over left or right side of board
        if (firstPiece <= 0 || firstPiece + shipLength - 2 >= 10) {
          return;
        }

        // Get list of elements that will be replaced with ship
        const elements = [];
        for (let i = firstPiece; i < firstPiece + shipLength; i++) {
          elements.push(
            document.querySelector(
              `[drop="droppable"][row="${i}"][column="${column}"]`
            )
          );
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
          element.style.backgroundColor = "rgb(161, 202, 255)";
        });
        canDrop = false;
      };

      // This happens if the element is droppable on
      const enterDroppable = (elem) => {
        const row = Number(elem.getAttribute("row"));
        const column = Number(elem.getAttribute("column"));
        const firstPiece = row - position;
        //  console.log("row", row);
        //  console.log("column", column);
        //  console.log("position", position);
        //  console.log("ship name", shipName);
        //  console.log("ship length", shipLength);
        //  console.log("first piece", firstPiece);

        // If ship extends over left or right side of board
        if (firstPiece <= 0 || firstPiece + shipLength - 2 >= 10) {
          return;
        }

        // Get list of elements that will be replaced with ship
        const elements = [];
        for (let i = firstPiece; i < firstPiece + shipLength; i++) {
          elements.push(
            document.querySelector(
              `[drop="droppable"][row="${i}"][column="${column}"]`
            )
          );
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
        finalPosition.row = firstPiece;
        finalPosition.column = column;
      };

      // Handle letting go of mouse button
      const onMouseUp = (event) => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        if (canDrop) {
          let counter = this.state.counter + 1;
          if (counter === 5) {
            this.setState({ startGame: true });
          }
          this.setState({ disableRotation: false, counter: counter });
          console.log(finalPosition.row, finalPosition.column);
          ship.style.display = "none";
          this.state.human.gameboard.placeShip(
            this.state.human.gameboard.ships[shipName],
            this.state.orientation,
            finalPosition.column,
            finalPosition.row
          );
          console.log(finalElements);
          finalElements.forEach((element) => {
            element.style.backgroundColor = "gray";
          });
          // If not dropped on board reset to previous position
        } else {
          ship.style.position = "static";
          ship.style.opacity = 1;
          this.setState({ disableRotation: false });
        }
        //console.log(this.state.human.gameboard.getGrid())
        return;
      };

      document.addEventListener("mouseup", onMouseUp);
    };

    if (this.state.orientation === "Horizontal") {
      horizontalDrag();
    } else {
      verticalDrag();
    }
  };

  render() {
    let turnIndicator = null;

    if (this.state.startGame) {
      turnIndicator = (
        <button onClick={() => this.startGame()}>Start Game</button>
      );
    } else if (this.state.currentTurn) {
      turnIndicator = <button disabled>Go: {this.state.currentTurn}</button>;
    }
    return (
      <React.Fragment>
        <div className={classes.Container}>
          <div>
            <Ships
              dragStart={this.handleDragStart}
              orientation={this.state.orientation}
              ships={this.state.human.gameboard.ships}
            />
            <div className={classes.Buttons}>
              {!this.state.disableRotation ? (
                <React.Fragment>
                  <button onClick={() => this.changeOrientation()}>
                    Rotate
                  </button>
                  <button onClick={() => this.autoPlace()}>Auto Place</button>
                </React.Fragment>
              ) : null}
            </div>
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
        <div className={classes.Turn}>{turnIndicator}</div>
      </React.Fragment>
    );
  }
}

export default Game;
