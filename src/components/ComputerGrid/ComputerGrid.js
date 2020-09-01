import React from "react";
import classes from "./ComputerGrid.module.css";

const computerGrid = (props) => {
  return props.grid.map((row, index) => {
    return (
      <div key={index + 1} className={classes.Row}>
        {row.map((column, index2) => {
          return (
            <div
              onClick={(event) => props.clickBoard(event)}
              row={index + 1}
              column={index2 + 1}
              key={`${index} ${index2}`}
              className={classes.Column}
            ></div>
          );
        })}
      </div>
    );
  });
};

export default computerGrid;