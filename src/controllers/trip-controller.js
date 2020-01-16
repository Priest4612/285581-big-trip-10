import SortComponent from '../components/sort.js';
import {SortType} from '../components/sort.js';
import DayListComponent from '../components/day-list.js';
import DayComponent from '../components/day.js';
import PointListComponent from '../components/point-list.js';
import NoPointComponent from '../components/no-point.js';
import {render} from '../utils/render.js';
import {RenderPosition} from '../utils/render.js';
import {formatDateTime} from '../utils/date';
import PointController from './point-controller.js';

const renderPoints = (pointListComponent, points, onDataChange) => {
  return points.map((point) => {
    const pointController = new PointController(pointListComponent, onDataChange);
    pointController.render(point);

    return pointController;
  });
};

const renderDay = (dayListComponent, points, date, onDataChange, isDefaultSorting) => {
  const currentPoints = isDefaultSorting
    ? points.slice().filter((point) => formatDateTime(point.dateStart).date === date)
    : points.slice();

  const dayElement = isDefaultSorting
    ? new DayComponent(currentPoints[0].dateStart)
    : new DayComponent();

  const pointListElement = new PointListComponent();

  render(dayListComponent, dayElement, RenderPosition.BEFOREEND);
  render(dayElement.getElement(), pointListElement, RenderPosition.BEFOREEND);
  renderPoints(pointListElement.getElement(), currentPoints, onDataChange);
};

const renderDays = (dayListComponent, points, onDataChange, isDefaultSorting = true) => {
  const dates = isDefaultSorting
    ? new Set(points.map((point) => formatDateTime(point.dateStart).date))
    : [true];
  dates.forEach((date) => {
    renderDay(dayListComponent, points, date, onDataChange, isDefaultSorting);
  });
};


export default class TripController {
  constructor(container) {
    this._container = container;

    this._points = [];

    this._noPointComponent = new NoPointComponent();
    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();

    this._onDataChange = this._onDataChange.bind(this);
  }

  render(points) {
    this._points = points;

    const container = this._container;

    if (!this._points.length) {
      render(container, this._noPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._dayListComponent, RenderPosition.BEFOREEND);

    const dayListElement = this._dayListComponent.getElement();

    renderDays(dayListElement, this._points, this._onDataChange);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedPoints = [];
      let isDefaultSorting = false;

      switch (sortType) {
        case SortType.TIME_DOWN:
          sortedPoints = this._points.slice().sort((a, b) => (b.dateEnd - b.dateStart) - (a.dateEnd - a.dateStart));
          break;
        case SortType.PRICE_DOWN:
          sortedPoints = this._points.slice().sort((a, b) => b.price - a.price);
          break;
        case SortType.DEFAULT:
          sortedPoints = this._points.slice();
          isDefaultSorting = true;
          break;
      }

      dayListElement.innerHTML = ``;

      renderDays(dayListElement, sortedPoints, isDefaultSorting);
    });
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._points.findIndex((point) => point === oldData);

    if (index === -1) {
      return;
    }

    this._points = [].concat(this._points.slice(0, index), newData, this._points.slice(index + 1));

    pointController.render(this._points[index]);
  }
}
