import Gameboard from "./Gameboard";

const Player = (name) => {
  const getName = () => name;
  
  const gameboard = Gameboard();

  const attack = (opposition, row, column) => {
    return opposition.gameboard.receiveAttack(row, column);
  }

  const computerAttack = (opposition) => {
    let row = Math.floor(Math.random() * 10) + 1;
    let column = Math.floor(Math.random() * 10) + 1;
    let result = opposition.gameboard.receiveAttack(row, column);
    while (result === false) {
      row = Math.floor(Math.random() * 10) + 1;
      column = Math.floor(Math.random() * 10) + 1;
      result = opposition.gameboard.receiveAttack(row, column);
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
