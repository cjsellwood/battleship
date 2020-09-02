import React from "react";
import classes from "./Ships.module.css";
import { ItemTypes } from "./Constants";
import { useDrag } from "react-dnd";

const Ships = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.SHIP },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

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
        key={ship.getName()}
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        {squares}
      </div>
    );
  });
  return <div className={classes.Ships}>{createShips}</div>;
};

export default Ships;
