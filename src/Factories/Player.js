import Gameboard from "./Gameboard";

const Player = (name) => {
  const getName = () => name;
  
  const gameboard = Gameboard();

  const attack = (opposition, column, row) => {
    return opposition.gameboard.receiveAttack(column, row);
  }

  const computerAttack = (opposition) => {
    let row = Math.floor(Math.random() * 10) + 1;
    let column = Math.floor(Math.random() * 10) + 1;
    let result = opposition.gameboard.receiveAttack(column, row);
    while (result === false) {
      row = Math.floor(Math.random() * 10) + 1;
      column = Math.floor(Math.random() * 10) + 1;
      result = opposition.gameboard.receiveAttack(column, row);
    }
    return result;
  }
  return {
    getName,
    attack,
    gameboard,
    computerAttack,
  }
}


export default Player;
