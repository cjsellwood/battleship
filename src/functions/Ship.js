const Ship = (name, length) => {
  const getName = () => name;
  const getLength = () => length;
  let damage = Array(length).fill("");
  const getDamage = () => damage;
  const hit = (position) => {
    damage[position] = "x";
    return damage;
  };
  let sunk = false;
  const isSunk = () => {
    if (!damage.includes("")) {
      sunk = true;
    } else {
      sunk = false
    }
    return sunk;
  };
  return {
    damage,
    sunk,
    length,
    getLength,
    getName,
    getDamage,
    hit,
    isSunk,
  };
};

export default Ship;
