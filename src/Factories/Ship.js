const Ship = (name) => {
  let length = 1;
  switch (name) {
    case "Carrier":
      length = 5;
      break;
    case "Battleship":
      length = 4;
      break;
    case "Destroyer":
      length = 3;
      break;
    case "Submarine":
      length = 3;
      break;
    case "PatrolBoat":
      length = 2;
      break;
    default:
      break;
  }
  let damage = Array(length).fill("");
  let sunk = false;
  let placed = false;

  const getPlaced = () => placed;
  const setPlaced = () => {
    placed = true;
  } 
  const getName = () => name;
  const getLength = () => length;
  const getDamage = () => damage;

  const hit = (position) => {
    damage[position] = "x";
    return damage;
  };

  const isSunk = () => {
    if (!damage.includes("")) {
      sunk = true;
    } else {
      sunk = false;
    }
    return sunk;
  };

  return {
    damage,
    sunk,
    length,
    placed,
    getLength,
    getName,
    getDamage,
    hit,
    isSunk,
    getPlaced,
    setPlaced,
  };
};

export default Ship;
