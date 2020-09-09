import React from "react";
import classes from "./ComputerGrid.module.css";
import Fire from "../../images/fire.png";

const computerGrid = (props) => {
  return props.grid.map((row, rowIndex) => {
    return (
      <div key={rowIndex + 1} className={classes.Row}>
        {row.map((column, colIndex) => {
          let classList = [classes.Column];
          let style = null;
          // If ship hit display fire image
          if (column === "Hit") {
            style = {
              backgroundColor: "black",
              backgroundImage: `url(${Fire})`,
              backgroundSize: "cover",
            };
          }
          return (
            <div
              onClick={(event) => props.clickBoard(event)}
              row={rowIndex + 1}
              column={colIndex + 1}
              key={`${rowIndex} ${colIndex}`}
              className={classList.join(" ")}
              style={style}
            >
              {column === "x" ? column : null}
            </div>
          );
        })}
      </div>
    );
  });
};

export default computerGrid;
