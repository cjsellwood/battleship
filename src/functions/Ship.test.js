import Ship from "./Ship";

test("get the length of ship", () => {
  expect(Ship("Destroyer", 3).getLength()).toBe(3)
})

test("get the name of ship", () => {
  expect(Ship("Carrier", 5).getName()).toBe("Carrier")
})

test("get damage to ship", () => {
  expect(Ship("Battleship", 4).getDamage()).toStrictEqual(["", "", "", ""])
})

test("hit the ship and cause damage", () => {
  expect(Ship("Patrol Boat", 2).hit(1)).toStrictEqual(["", "x"])
})

test("Test for if ship is sunk", () => {
  expect(Ship("Submarine", 3).isSunk()).toBe(false);
})