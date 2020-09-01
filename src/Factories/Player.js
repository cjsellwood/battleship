import Gameboard from "./Gameboard";

const Player = (name) => {
  const getName = () => name;
  
  const gameboard = Gameboard();
  const attack = (opposition, column, row) => {
    return opposition.gameboard.receiveAttack(column, row)
  }

  return {
    getName,
    attack,
    gameboard,
  }
}


export default Player;
