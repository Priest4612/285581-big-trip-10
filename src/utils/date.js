import {getRandomInteger} from './common.js';

const getRandomHours = (date, intervalHours) => {
  const targetDate = new Date(date);
  const hours = getRandomInteger(targetDate.getHours(), intervalHours) % 24;
  const minutes = getRandomInteger(targetDate.getMinutes(), 59);
  targetDate.setHours(targetDate.getHours() + hours, targetDate.getMinutes() + minutes);
  return targetDate;
};


export const getRandomDateDay = (referencePoint = null, startDayPoint = 3, intervalHours = 8) => {
  let dateStart = 0;
  let dateEnd = 0;

  if (!referencePoint) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - getRandomInteger(0, startDayPoint));
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
  const yyyy = date.getFullYear();
  const mm = castTimeFormat(date.getMonth() + 1);
  const dd = castTimeFormat(date.getDate());
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return {
    date: `${yyyy}-${mm}-${dd}`,
    dateTime: `${dd}/${mm}/${String(yyyy).slice(2)} ${hours}:${minutes}`,
  };
};
