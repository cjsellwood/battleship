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
      grid[row - 1][column - 1 + i] = ship.getName() + i;
    }
    return grid;
  };

  const receiveAttack = (row, column) => {
    if (grid[row - 1][column - 1] === "") {
      // Set as missed
      grid[row - 1][column - 1] = "x";
      return grid;
    } else if (grid[row - 1][column - 1] === "x") {
      // Disallow
      return false;
    } else {
      // Ship hit
      const content = grid[row - 1][column - 1]
      const shipName = content.slice(0, content.length - 1);
      const hitPosition = content[content.length - 1]
      let ship = Ship(shipName)
      ship.hit(hitPosition)

      // Mark as hit
      grid[row - 1][column - 1] = "x";
      return grid;
    }
  };

  const allSunk = () => { 
    let sunk = true;
    grid.forEach((row) => {
      row.forEach((column) => {
        if (column !== "" && column !== "x") {
          sunk = false;
        }
      })
    })
    return sunk;
  }
  return {
    grid,
    getGrid,
    placeShip,
    receiveAttack,
    allSunk,
  };
};

export default Gameboard;
