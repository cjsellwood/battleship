import Player from "./Player";

test("attack on board of enemy player", () => {
  const opposition = Player("Computer");
  expect(Player("Human").attack(opposition, 5, 5)).toBe("x");
});

test("attack on board of enemy player that has already been hit", () => {
  const opposition = Player("Computer");
  opposition.gameboard.receiveAttack(5, 5);
  expect(Player("Human").attack(opposition, 5, 5)).toBe(false);
});

test("attack on board by computer", () => {
  const opposition = Player("Human");
  expect(Player("Computer").computerAttack(opposition, 5, 5)).toBe("x");
});
