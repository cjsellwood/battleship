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
  let placed = false;

  const getPlaced = () => placed;
  const setPlaced = () => {
    placed = true;
  };
  const getName = () => name;
  const getLength = () => length;

  return {
    getLength,
    getName,
    getPlaced,
    setPlaced,
  };
};

export default Ship;
