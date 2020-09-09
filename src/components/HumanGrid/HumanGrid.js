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
          // If ship hit display fire image
          if (column === "Hit") {
            style = {
              backgroundColor: "black",
              backgroundImage: `url(${Fire})`,
              backgroundSize: "cover",
            };
          // If ship, display gray box
          } else if (column !== "x" && column !== "") {
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
              {column === "x" ? column : null}
            </div>
          );
        })}
      </div>
    );
  });
};

export default humanGrid;
