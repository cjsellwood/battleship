import Ship from "./Ship";

test("get the length of ship", () => {
  expect(Ship("Destroyer").getLength()).toBe(3);
});

test("get the name of ship", () => {
  expect(Ship("Carrier").getName()).toBe("Carrier");
});

test("get placed status", () => {
  expect(Ship("Carrier").getPlaced()).toBe(false);
});

test("get placed status after setting placed as true", () => {
  const testShip = Ship("Carrier");
  testShip.setPlaced();
  expect(testShip.getPlaced()).toBe(true);
});