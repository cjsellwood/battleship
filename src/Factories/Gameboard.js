import Ship from "./Ship";

const Gameboard = () => {
  let ships = {
    Carrier: Ship("Carrier"),
    Battleship: Ship("Battleship"),
    Destroyer: Ship("Destroyer"),
    Submarine: Ship("Submarine"),
    PatrolBoat: Ship("PatrolBoat"),
  };
  // Create 10 x 10 grid
  let grid = [];
  for (let i = 0; i < 10; i++) {
    grid.push(Array(10).fill(""));
  }
  const getGrid = () => grid;

  // Place ship in grid
  const placeShip = (shipObj, orientation, row, column) => {
    if (!row || !column) return false;
    if (orientation === "Horizontal") {
      for (let i = 0; i < shipObj.length; i++) {
        // If going to go off board
        if (column - 1 + i >= 10 || row - 1 + i < 0) {
          return false;
        }

        // If going to overlap another ship
        if (grid[row - 1][column - 1 + i] !== "") {
          return false;
        }
      }
      for (let i = 0; i < shipObj.length; i++) {
        grid[row - 1][column - 1 + i] = shipObj.getName() + i;
      }
      return grid;
    } else {
      for (let i = 0; i < shipObj.length; i++) {
        // If going to go off board
        if (row - 1 + i >= 10 || row - 1 + i < 0) {
          return false;
        }

        // If going to overlap another ship
        if (grid[row - 1 + i][column - 1] !== "") {
          return false;
        }
      }
      for (let i = 0; i < shipObj.length; i++) {
        grid[row - 1 + i][column - 1] = shipObj.getName() + i;
      }
      return grid;
    }
  };

  const autoPlaceShips = () => {
    for (const ship in ships) {
      if (!ships[ship].getPlaced()) {
        let row,
          column = null;
        let orientation = Math.random() > 0.5 ? "Horizontal" : "Vertical";
        while (!placeShip(ships[ship], orientation, row, column)) {
          row = Math.floor(Math.random() * 10) + 1;
          column = Math.floor(Math.random() * 10) + 1;
        }
        ships[ship].setPlaced();
      }
    }
  };

  const receiveAttack = (row, column) => {
    if (grid[row - 1][column - 1] === "") {
      // Set as missed
      grid[row - 1][column - 1] = "x";
      return true;
    } else if (
      grid[row - 1][column - 1] === "x" ||
      grid[row - 1][column - 1] === "Hit"
    ) {
      // Disallow
      return false;
    } else {
      // Ship hit
      const content = grid[row - 1][column - 1];
      const shipName = content.slice(0, content.length - 1);
      const hitPosition = content[content.length - 1];
      let ship = Ship(shipName);
      ship.hit(hitPosition);

      // Mark as hit
      grid[row - 1][column - 1] = "Hit";
      return true;
    }
  };

  const allSunk = () => {
    let sunk = true;
    grid.forEach((row) => {
      row.forEach((column) => {
        if (column !== "" && column !== "x" && column !== "Hit") {
          sunk = false;
        }
      });
    });
    return sunk;
    // ships.forEach((ship) => {
    //   if (!ship.isSunk) {
    //     sunk = false;
    //   }
    // })
    // return sunk;
  };
  return {
    ships,
    grid,
    getGrid,
    placeShip,
    receiveAttack,
    allSunk,
    autoPlaceShips,
  };
};

export default Gameboard;
