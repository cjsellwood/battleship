import Gameboard from "./Gameboard";

const Player = (name) => {
  const getName = () => name;

  const gameboard = Gameboard();

  const attack = (opposition, row, column) => {
    return opposition.gameboard.receiveAttack(row, column);
  };

  const hits = [];

  // Randomly choose adjacent square to last hit
  const adjacentAttack = (opposition, lastAttack) => {
    console.log("adjacent");
    let newAttack = Math.random();
    let row = -1;
    let column = -1;
    // Ensure that hits will be inside board
    console.log(row, column);
    while (row < 1 || row > 10 || column < 1 || column > 10) {
      newAttack = Math.random();
      console.log(newAttack)
      row = lastAttack.row;
      column = lastAttack.column;
      if (newAttack < 0.25) {
        row -= 1;
      } else if (newAttack < 0.5) {
        row += 1;
      } else if (newAttack < 0.75) {
        column -= 1;
      } else {
        column += 1;
      }
    }

    console.log(row, column);
    let result = opposition.gameboard.receiveAttack(row, column);
    console.log(result)
    let i = 0;
    while (result === false) {
      while (row < 1 || row > 10 || column < 1 || column > 10) {
        newAttack = Math.random();
        row = lastAttack.row;
        column = lastAttack.column;
        if (newAttack < 0.25) {
          row -= 1;
        } else if (newAttack < 0.5) {
          row += 1;
        } else if (newAttack < 0.75) {
          column -= 1;
        } else {
          column += 1;
        }
      }
      result = opposition.gameboard.receiveAttack(row, column);
      console.log(result);
      i += 1;
      if (i === 100) {
        return false;
      }
    }

    let lastHit = {
      row,
      column,
      result,
    };
    hits.push(lastHit);
    return result;
  };

  // Randomly attack board
  const randomAttack = (opposition) => {
    let row = Math.floor(Math.random() * 10) + 1;
    let column = Math.floor(Math.random() * 10) + 1;
    let result = opposition.gameboard.receiveAttack(row, column);
    while (result === false) {
      row = Math.floor(Math.random() * 10) + 1;
      column = Math.floor(Math.random() * 10) + 1;
      result = opposition.gameboard.receiveAttack(row, column);
    }
    let lastHit = {
      row,
      column,
      result,
    };
    hits.push(lastHit);
    return result;
  };

  const computerAttack = (opposition) => {
    console.log(hits);
    if (hits.length !== 0) {
      let lastAttack = hits[hits.length - 1];
      // Attack adjacent spot if last attack was a hit
      if (lastAttack.result === "Hit") {
        if(!adjacentAttack(opposition, lastAttack)) {
          randomAttack(opposition)
        };
      } else {
        randomAttack(opposition);
      }
    } else {
      randomAttack(opposition);
    }

    // Keep track of computer attacks
  };
  return {
    getName,
    attack,
    gameboard,
    computerAttack,
  };
};

export default Player;
