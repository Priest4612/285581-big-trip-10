import {getRandomInteger} from './common.js';
import moment from 'moment';

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
    targetDate.setDate(targetDate.getDate() - getRandomInteger(3, startDayPoint));
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
  return moment(date).format(`HH:mm`);
};


export const formatDateTime = (date) => {
  return {
    date: moment(date).format(`YYYY-MM-DD`),
    dateTimeEdit: moment(date).format(`DD/MM/YY HH:mm`),
    dateTimePoint: moment(date).format(`YYYY-MM-DDTHH:mm:ss`),
  };
};
