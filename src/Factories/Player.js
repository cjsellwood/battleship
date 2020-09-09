import Gameboard from "./Gameboard";

const Player = (name) => {
  const gameboard = Gameboard();

  // Attack the oppositions gameboard
  const attack = (opposition, row, column) => {
    return opposition.gameboard.receiveAttack(row, column);
  };

  const hits = [];

  // Computer attacks the humans board
  const computerAttack = (opposition) => {
    // Random first attack
    if (hits.length === 0) {
      randomAttack(opposition);

      // Second attack is either adjacent or random
    } else if (hits.length === 1) {
      let lastAttack = hits[hits.length - 1];
      if (lastAttack.result === "Hit") {
        // If can't find available adjacent do random attack
        if (!adjacentAttack(opposition, lastAttack)) {
          randomAttack(opposition);
          return;
        }
      } else {
        randomAttack(opposition);
      }
      // Attack next spot in pattern if two hits consecutively
    } else {
      let lastAttack = hits[hits.length - 1];
      let secondLast = hits[hits.length - 2];
      if (lastAttack.result === "Hit" && secondLast.result === "Hit") {
        // If no pattern found do random attack
        if (!sequentialAttack(opposition, lastAttack, secondLast)) {
          randomAttack(opposition);
          return;
        }
      } else {
        if (lastAttack.result === "Hit") {
          // If can't find available adjacent do random attack
          if (!adjacentAttack(opposition, lastAttack)) {
            randomAttack(opposition);
            return;
          }
        } else {
          randomAttack(opposition);
        }
      }
    }
    return hits[hits.length - 1].result;
  };

  // Randomly choose adjacent square to last hit
  const adjacentAttack = (opposition, lastAttack) => {
    let newAttack = Math.random();
    let row = -1;
    let column = -1;
    // Ensure that hits will be inside board
    console.log(row, column);
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

    let result = opposition.gameboard.receiveAttack(row, column);
    let i = 0;
    while (result === false) {
      row = -1;
      column = -1;
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

      i += 1;
      // Return if empty adjacent space not found
      if (i === 100) {
        return false;
      }
    }

    // Record hit
    let lastHit = {
      row,
      column,
      result,
    };
    hits.push(lastHit);
    return result;
  };

  // If 2 hits in a row continue pattern
  const sequentialAttack = (opposition, lastAttack, secondLast) => {
    let row,
      column = null;

    // If two in a row horizontally
    if (lastAttack.row === secondLast.row) {
      row = lastAttack.row;
      if (lastAttack.column > secondLast.column) {
        column = lastAttack.column + 1;
      } else {
        column = lastAttack.column - 1;
      }
      // If two in a row vertically
    } else if (lastAttack.column === secondLast.column) {
      column = lastAttack.column;
      if (lastAttack.row > secondLast.row) {
        row = lastAttack.row + 1;
      } else {
        row = lastAttack.row - 1;
      }
      // If not either return
    } else {
      return false;
    }
    // If outside bounds return
    if (row > 10 || row < 1 || column > 10 || column < 1) {
      return false;
    }

    let result = opposition.gameboard.receiveAttack(row, column);

    // Record hit
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

    // Ensure that hits available space
    while (result === false) {
      row = Math.floor(Math.random() * 10) + 1;
      column = Math.floor(Math.random() * 10) + 1;
      result = opposition.gameboard.receiveAttack(row, column);
    }

    // Record hit
    let lastHit = {
      row,
      column,
      result,
    };
    hits.push(lastHit);
    return result;
  };

  return {
    attack,
    gameboard,
    computerAttack,
  };
};

export default Player;
