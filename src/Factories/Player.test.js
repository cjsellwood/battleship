import Player from "./Player";

test("get name of player", () => {
  expect(Player("Human").getName()).toBe("Human");
});

test ("attack on board of enemy player", () => {
  const opposition = Player("Computer")
  const testGrid = [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "x", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ];
  console.log(opposition.gameboard.receiveAttack)
  expect(Player("Human").attack(opposition, 5, 5)).toStrictEqual(testGrid);
})