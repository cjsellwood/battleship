import React, { Component } from "react";
import classes from "./App.module.css";
import Game from "./components/Game";

class App extends Component {
  render() {
    return (
      <div>
        <div className={classes.Top}>Battleship</div>
        <Game/>
      </div>
    );
  }
}

export default App;
