import Ship from "./Ship";

const Gameboard = () => {
  let ships = [
    Ship("Carrier"),
    Ship("Battleship"),
    Ship("Destroyer"),
    Ship("Submarine"),
    Ship("Patrol Boat")
  ]
  // Create 10 x 10 grid
  let grid = [];
  for (let i = 0; i < 10; i++) {
    grid.push(Array(10).fill(""));
  }
  const getGrid = () => grid;

  // Place ship in grid
  const placeShip = (shipObj, row, column) => {
    for (let i = 0; i < shipObj.length; i++) {
      grid[row - 1][column - 1 + i] = shipObj.getName() + i;
    }
    return grid;
  };

  const receiveAttack = (row, column) => {
    if (grid[row - 1][column - 1] === "") {
      // Set as missed
      grid[row - 1][column - 1] = "x";
      return true;
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
      return true;
    }
  };

  const allSunk = () => { 
    let sunk = true;
    // grid.forEach((row) => {
    //   row.forEach((column) => {
    //     if (column !== "" && column !== "x") {
    //       sunk = false;
    //     }
    //   })
    // })
    // return sunk;
    ships.forEach((ship) => {
      if (!ship.isSunk) {
        sunk = false;
      }
    })
    return sunk;
  }
  return {
    ships,
    grid,
    getGrid,
    placeShip,
    receiveAttack,
    allSunk,
  };
};

export default Gameboard;
