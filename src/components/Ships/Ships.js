import React from "react";
import classes from "./Ships.module.css";

const Ships = (props) => {
  const createShips = [];
  for (const ship in props.ships) {
    let squares = [];
    for (let i = 0; i < props.ships[ship].getLength(); i++) {
      squares.push(
        <div
          name={props.ships[ship].getName()}
          position={i}
          key={props.ships[ship].getName() + i}
        ></div>
      );
    }
    createShips.push(
      <div
        onMouseDown={(event) => props.dragStart(event)}
        key={props.ships[ship].getName()}
      >
        {squares}
      </div>
    );
  }

  // Change orientation of ships by changing classes
  let classList = [];
  if (props.orientation === "Vertical") {
    classList = [classes.VerticalShips];
  } else {
    classList = [classes.Ships];
  }

  // Hide ships if on mobile
  if (props.currentTurn !== null) {
    classList.push(classes.HideShips);
  }
  return <div className={classList.join(" ")}>{createShips}</div>;
};

export default Ships;
