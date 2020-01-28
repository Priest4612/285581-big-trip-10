import SortComponent from '../components/sort.js';
import {SortType} from '../components/sort.js';
import DayListComponent from '../components/day-list.js';
import NoPointComponent from '../components/no-point.js';
import DayComponent from "../components/day.js";
import PointListComponent from "../components/point-list.js";

import {render, RenderPosition} from '../utils/render.js';
import {formatDateTime} from "../utils/date.js";

import PointController from "./point-controller.js";

const renderPoints = (pointListElement, points, onDataChange, onViewChange) => {
  return points.map((point) => {
    const taskController = new PointController(pointListElement, onDataChange, onViewChange);
    taskController.render(point);

    return taskController;
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._points = [];
    this._showedPointsControllers = [];
    this._isDefaultSorting = true;
    this._dateList = null;

    this._noPointComponent = new NoPointComponent();
    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(points) {
    const container = this._container;
    this._points = points;

    if (!this._points.length) {
      render(container, this._noPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._dayListComponent, RenderPosition.BEFOREEND);

    const dayListComponent = this._dayListComponent.getElement();

    if (this._isDefaultSorting) {
      this._groupingByDay(this._points);
      this._dateList.forEach((date) => {
        const currentPoints = this._points.slice().filter((point) => formatDateTime(point.dateStart).date === date);
        this._renderDay(dayListComponent, currentPoints[0].dateStart, currentPoints);
      });
      return;
    }

    this._renderDay(dayListComponent, this._dateList, this._points);
  }

  _onSortTypeChange(sortType) {
    let sortedPoints = [];

    this._isDefaultSorting = false;
    this._dateList = null;

    switch (sortType) {
      case SortType.TIME_DOWN:
        sortedPoints = this._points.slice().sort((a, b) => (b.dateEnd - b.dateStart) - (a.dateEnd - a.dateStart));
        break;
      case SortType.PRICE_DOWN:
        sortedPoints = this._points.slice().sort((a, b) => b.price - a.price);
        break;
      case SortType.DEFAULT:
        sortedPoints = this._points.slice();
        this._isDefaultSorting = true;
        break;
    }

    const dayListComponent = this._dayListComponent.getElement();
    dayListComponent.innerHTML = ``;

    this.render(sortedPoints);
  }

  _groupingByDay(points) {
    this._dateList = new Set(points.map((point) => formatDateTime(point.dateStart).date));
  }

  _renderDay(dayListComponent, date, points) {
    const dayComponent = new DayComponent(date);
    const pointListComponent = new PointListComponent();

    render(dayListComponent, dayComponent, RenderPosition.BEFOREEND);
    render(dayComponent.getElement(), pointListComponent, RenderPosition.BEFOREEND);

    const newPoints = renderPoints(pointListComponent.getElement(), points, this._onDataChange, this._onViewChange);
    // points.map((point) => {
    //   const pointController = new PointController(pointListComponent.getElement(), this._onDataChange, this._onViewChange);
    //   pointController.render(point);
    //   this._showedPointsControllers.push(pointController);
    // });
    this._showedPointsControllers = this._showedPointsControllers.concat(newPoints);
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._points.findIndex((point) => point === oldData);

    if (index === -1) {
      return;
    }

    this._points = [].concat(this._points.slice(0, index), newData, this._points.slice(index + 1));

    pointController.render(this._points[index]);
  }

  _onViewChange() {
    this._showedPointsControllers.forEach((point) => {
      point.setDefaultView();
    });
  }
}
