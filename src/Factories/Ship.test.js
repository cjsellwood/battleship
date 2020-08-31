import Ship from "./Ship";

test("get the length of ship", () => {
  expect(Ship("Destroyer").getLength()).toBe(3)
})

test("get the name of ship", () => {
  expect(Ship("Carrier").getName()).toBe("Carrier")
})

test("get damage to ship", () => {
  expect(Ship("Battleship").getDamage()).toStrictEqual(["", "", "", ""])
})

test("hit the ship and cause damage", () => {
  expect(Ship("Patrol Boat").hit(1)).toStrictEqual(["", "x"])
})

test("Test for if ship is sunk", () => {
  expect(Ship("Submarine").isSunk()).toBe(false);
})
