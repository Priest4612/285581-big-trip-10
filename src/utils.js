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

const getRandomHours = (date, intervalHours) => {
  const targetDate = new Date(date);
  const hours = getRandomInteger(targetDate.getHours(), intervalHours) % 24;
  const minutes = getRandomInteger(targetDate.getMinutes(), 59);
  targetDate.setHours(targetDate.getHours() + hours, targetDate.getMinutes() + minutes);
  return targetDate;
};

export const getRandomDateDay = (referencePoint = null, startDayEvent = 3, intervalHours = 8) => {
  let dateStart = 0;
  let dateEnd = 0;

  if (!referencePoint) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - getRandomInteger(0, startDayEvent));
    dateStart = getRandomHours(targetDate, intervalHours);
    dateEnd = getRandomHours(dateStart, intervalHours);
  } else {
    const targetDate = referencePoint;
    dateStart = getRandomHours(targetDate, intervalHours);
    dateEnd = getRandomHours(dateStart, intervalHours);
  }

  return {dateStart, dateEnd};
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

const cloneObject = (source) => {
  const clone = {};

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (isObject(source[key])) {
        clone[key] = cloneObject(source[key]);
      } else {
        clone[key] = source[key];
      }
    }
  }
  return clone;
};

export const cloneArray = (source) => {
  const clone = [];

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (isObject(source[key])) {
        clone[key] = cloneObject(source[key]);
      } else {
        clone[key] = source[key];
      }
    }
  }
  return clone;
};


export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};


export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};
