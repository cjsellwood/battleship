import Ship from "./Ship";

const Gameboard = () => {
  // List of ships to add to gameboard
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
      for (let i = 0; i < shipObj.getLength(); i++) {
        // If going to go off board
        if (column - 1 + i >= 10 || column - 1 + i < 0) {
          return false;
        }

        // If going to overlap another ship
        if (grid[row - 1][column - 1 + i] !== "") {
          return false;
        }
      }
      // Place ship
      for (let i = 0; i < shipObj.getLength(); i++) {
        grid[row - 1][column - 1 + i] = shipObj.getName() + i;
      }
      return grid;
    } else {
      for (let i = 0; i < shipObj.getLength(); i++) {
        // If going to go off board
        if (row - 1 + i >= 10 || row - 1 + i < 0) {
          return false;
        }

        // If going to overlap another ship
        if (grid[row - 1 + i][column - 1] !== "") {
          return false;
        }
      }
      // Place ship
      for (let i = 0; i < shipObj.getLength(); i++) {
        grid[row - 1 + i][column - 1] = shipObj.getName() + i;
      }
      return grid;
    }
  };

  // Place ships in random positions
  const autoPlaceShips = () => {
    for (const ship in ships) {
      // Only place if not already placed
      if (!ships[ship].getPlaced()) {
        let row = null;
        let column = null;
        let orientation = Math.random() > 0.5 ? "Horizontal" : "Vertical";

        // Ensure that space is available for ship to be placed
        while (!placeShip(ships[ship], orientation, row, column)) {
          row = Math.floor(Math.random() * 10) + 1;
          column = Math.floor(Math.random() * 10) + 1;
        }
        ships[ship].setPlaced();
      }
    }
  };

  // Attack the board
  const receiveAttack = (row, column) => {
    let space = grid[row - 1][column - 1];
    // Set as missed
    if (space === "") {
      grid[row - 1][column - 1] = "x";
      return "x";

      // Don't allow if already attacked
    } else if (space === "x" || space === "Hit") {
      return false;
      // If a ship hit
    } else {
      grid[row - 1][column - 1] = "Hit";
      return "Hit";
    }
  };

  // Check if all ships are sunk
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
  };
  return {
    ships,
    getGrid,
    placeShip,
    receiveAttack,
    allSunk,
    autoPlaceShips,
  };
};

export default Gameboard;
