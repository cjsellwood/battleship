import React from "react";
import classes from "./HumanGrid.module.css";

const humanGrid = (props) => {
  return props.grid.map((row, index) => {
    return (
      <div key={index + 1} className={classes.Row}>
        {row.map((column, index2) => {
          return (
            <div
              row={index + 1}
              column={index2 + 1}
              key={`${index} ${index2}`}
              className={classes.Column}
              drop="droppable"
            >
              {props.grid[index][index2] === "x"
                ? props.grid[index][index2]
                : null}
            </div>
          );
        })}
      </div>
    );
  });
};

export default humanGrid;
