import React from "react";
import classes from "./HumanGrid.module.css";

const humanGrid = (props) => {
  return props.grid.map((row, rowIndex) => {
    return (
      <div key={rowIndex + 1} className={classes.Row}>
        {row.map((column, colIndex) => {
          let classList = [classes.Column];
          if (
            props.grid[colIndex][rowIndex] !== "x" &&
            props.grid[colIndex][rowIndex] !== ""
          ) {
            classList.push(classes.ShipGray)
          }

            return (
              <div
                row={rowIndex + 1}
                column={colIndex + 1}
                key={`${rowIndex} ${colIndex}`}
                className={classList.join(" ")}
                drop="droppable"
              >
                {props.grid[colIndex][rowIndex] === "x"
                  ? props.grid[colIndex][rowIndex]
                  : null}
              </div>
            );
        })}
      </div>
    );
  });
};

export default humanGrid;
