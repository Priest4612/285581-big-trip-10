import {FilterList} from '../const.js';
import moment from 'moment';


const getPointByTime = (points, time) => {
  const currentDate = new Date();

  return points.filter((point) => {
    switch (time) {
      case FilterList.FUTURE.value:
        return moment(point.dateStart).isAfter(moment(currentDate));
      case FilterList.PAST.value:
        return moment(point.dateStart).isBefore(moment(currentDate));
    }

    return points;
  });
};

export const getPointsByFilter = (points, filterType) => {
  switch (filterType) {
    case FilterList.PAST.value:
      return getPointByTime(points, FilterList.PAST.value);
    case FilterList.FUTURE.value:
      return getPointByTime(points, FilterList.FUTURE.value);
  }

  return points;
};
