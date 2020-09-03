import React from "react";
import classes from "./Ships.module.css";
// import { ItemTypes } from "./Constants";
// import { useDrag } from "react-dnd";

const Ships = (props) => {
  // const [{ isDragging }, drag] = useDrag({
  //   item: { type: ItemTypes.SHIP },
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // });

  const createShips = [];
  props.ships.forEach((ship) => {
    let squares = [];
    for (let i = 0; i < ship.length; i++) {
      squares.push(
        <div name={ship.getName()} position={i} key={ship.getName() + i}></div>
      );
    }
    createShips.push(
      <div
        onMouseDown={(event) => props.dragStart(event)}
        //draggable="true"
        key={ship.getName()}
        // ref={drag}
        // style={{
        //   opacity: isDragging ? 0.5 : 1,
        // }}
      >
        {squares}
      </div>
    );
  });
  let classList = [];
  if (props.orientation === "Vertical") {
    classList = [classes.Ships, classes.Vertical];
  } else {
    classList = [classes.Ships];
  }
  return (
    <div
      className={classList.join(" ")}
    >
      {createShips}
    </div>
  );
};

export default Ships;
