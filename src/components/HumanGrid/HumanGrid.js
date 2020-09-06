import React from "react";
import classes from "./HumanGrid.module.css";
import Fire from "../../images/fire.png";

const humanGrid = (props) => {
  return props.grid.map((row, rowIndex) => {
    return (
      <div key={rowIndex + 1} className={classes.Row}>
        {row.map((column, colIndex) => {
          let classList = [classes.Column];
          let style = null;
          if (props.grid[colIndex][rowIndex] === "Hit") {
            style = {
              backgroundColor: "black",
              backgroundImage: `url(${Fire})`,
              backgroundSize: "cover",
            };
          } else if (
            props.grid[colIndex][rowIndex] !== "x" &&
            props.grid[colIndex][rowIndex] !== ""
          ) {
            classList.push(classes.ShipGray);
            // Style changes color if dragging was used before auto place
            style = { backgroundColor: "gray" };
          }

          return (
            <div
              row={rowIndex + 1}
              column={colIndex + 1}
              key={`${rowIndex} ${colIndex}`}
              className={classList.join(" ")}
              style={style}
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
