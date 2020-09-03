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
  for (const ship in props.ships) {
    let squares = [];
    for (let i = 0; i < props.ships[ship].length; i++) {
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
        //draggable="true"
        key={props.ships[ship].getName()}
        // ref={drag}
        // style={{
        //   opacity: isDragging ? 0.5 : 1,
        // }}
      >
        {squares}
      </div>
    );
  }

  let classList = [];
  if (props.orientation === "Vertical") {
    classList = [classes.Ships, classes.Vertical];
  } else {
    classList = [classes.Ships];
  }
  return <div className={classList.join(" ")}>{createShips}</div>;
};

export default Ships;
