import Ship from "./Ship";

const Gameboard = () => {
  // Create 10 x 10 grid
  let grid = [];
  for (let i = 0; i < 10; i++) {
    grid.push(Array(10).fill(""));
  } 
  const getGrid = () => grid;

  // Place ship in grid
  const placeShip = (name, row, column) => {
    let ship = Ship(name);
    for (let i = 0; i < ship.length; i++) {
      console.log(row - 1, column - 1 + i)
      console.log(grid[row - 1][column - 1 + i] )
      grid[row - 1][column - 1 + i] = "Battleship" + i;
    }
    return grid
  }
  return {
    grid,
    getGrid,
    placeShip
  };
};

export default Gameboard;
