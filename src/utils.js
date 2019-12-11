export const getRandomInteger = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};


export const getRandomArrayItem = (array, startIndex = 0) => {
  return array[getRandomInteger(startIndex, array.length - 1)];
};


export const getRandomDate = (endEvent = 30) => {
  const targetDate = new Date();
  const hours = getRandomInteger(0, 23);
  const minutes = getRandomInteger(0, 59);
  targetDate.setDate(targetDate.getDate() + getRandomInteger(0, endEvent));
  targetDate.setHours(hours, minutes);

  return targetDate;
};

export const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : value;
};


export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const formatDateTime = (date) => {
  const yy = String(date.getYear()).slice(1);
  const mm = castTimeFormat(date.getMonth() + 1);
  const dd = castTimeFormat(date.getDate());
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${dd}/${mm}/${yy} ${hours}:${minutes}`;
};

const isObject = (object) => {
  const type = typeof object;
  return type === `function` || type === `object`;
};

export const cloneArray = (source) => {
  const clone = [];

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (isObject(source[key])) {
        clone[key] = cloneArray(source[key]);
      } else {
        clone[key] = source[key];
      }
    }
  }
  return clone;
};
