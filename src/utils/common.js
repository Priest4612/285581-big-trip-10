export const getRandomInteger = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};


export const getRandomArrayItem = (array, startIndex = 0) => {
  return array[getRandomInteger(startIndex, array.length - 1)];
};
