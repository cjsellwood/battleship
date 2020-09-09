import React from "react";
import classes from "./ControlButtons.module.css";

const controlButtons = (props) => {
  let buttons = null;
  if (!props.disableRotation) {
    buttons = (
      <React.Fragment>
        <button
          className={classes.HideRotate}
          onClick={props.changeOrientation}
        >
          Rotate
        </button>
        <button onClick={props.autoPlace}>Auto Place</button>
      </React.Fragment>
    );
  }

  return <div className={classes.Buttons}>{buttons}</div>;
};

export default controlButtons;
