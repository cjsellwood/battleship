import Gameboard from "./Gameboard";
import Ship from "./Ship";

test("Get current grid", () => {
  const testGrid = [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ];

  expect(Gameboard().getGrid()).toStrictEqual(testGrid);
});

test("Test placement of ship horizontally", () => {
  const testGrid = [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    [
      "",
      "",
      "",
      "",
      "Battleship0",
      "Battleship1",
      "Battleship2",
      "Battleship3",
      "",
      "",
    ],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ];
  const shipObj = Ship("Battleship");
  expect(Gameboard().placeShip(shipObj, "Horizontal", 5, 5)).toStrictEqual(
    testGrid
  );
});

test("Test placement of ship vertically", () => {
  const testGrid = [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "Battleship0", "", "", "", "", ""],
    ["", "", "", "", "Battleship1", "", "", "", "", ""],
    ["", "", "", "", "Battleship2", "", "", "", "", ""],
    ["", "", "", "", "Battleship3", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ];
  const shipObj = Ship("Battleship");
  expect(Gameboard().placeShip(shipObj, "Vertical", 5, 5)).toStrictEqual(
    testGrid
  );
});

test("Test attack on board that misses", () => {
  expect(Gameboard().receiveAttack(5, 5)).toStrictEqual("x");
});

test("Test attack on board that has already been hit", () => {
  const testGameboard = Gameboard();
  testGameboard.receiveAttack(5, 5);
  expect(testGameboard.receiveAttack(5, 5)).toBe(false);
});

test("Test attack on board with ship", () => {
  const testGameboard = Gameboard();
  const shipObj = Ship("Battleship");
  testGameboard.placeShip(shipObj, "Horizontal", 5, 5);
  expect(testGameboard.receiveAttack(5, 6)).toStrictEqual("Hit");
});

test("Test if all ships sunk with a ship on board", () => {
  const testGameboard = Gameboard();
  const shipObj = Ship("Battleship");
  testGameboard.placeShip(shipObj, "Horizontal", 5, 5);
  expect(testGameboard.allSunk()).toBe(false);
});

test("Test if all ships sunk with destroyed ship and some misses", () => {
  const testGameboard = Gameboard();
  const shipObj = Ship("Battleship");
  testGameboard.placeShip(shipObj, 5, 5);
  testGameboard.receiveAttack(5, 5);
  testGameboard.receiveAttack(5, 6);
  testGameboard.receiveAttack(5, 7);
  testGameboard.receiveAttack(5, 8);
  testGameboard.receiveAttack(1, 1);
  testGameboard.receiveAttack(8, 10);
  expect(testGameboard.allSunk()).toBe(true);
});
