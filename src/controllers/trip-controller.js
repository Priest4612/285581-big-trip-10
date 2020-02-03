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
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

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
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const container = this._container;
    const points = this._pointsModel.getPointsAll();

    if (!points.length) {
      render(container, this._noPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._dayListComponent, RenderPosition.BEFOREEND);

    const dayListComponent = this._dayListComponent.getElement();

    if (this._isDefaultSorting) {
      this._groupingByDay(points);
      this._dateList.forEach((date) => {
        const currentPoints = points.slice().filter((point) => formatDateTime(point.dateStart).date === date);
        this._renderDay(dayListComponent, currentPoints[0].dateStart, currentPoints);
      });
      return;
    }

    this._renderDay(dayListComponent, this._dateList, points);
  }

  _onSortTypeChange(sortType) {
    let sortedPoints = [];
    const points = this._pointsModel.getPointsAll();

    this._isDefaultSorting = false;
    this._dateList = null;

    switch (sortType) {
      case SortType.TIME_DOWN:
        sortedPoints = points.slice().sort((a, b) => (b.dateEnd - b.dateStart) - (a.dateEnd - a.dateStart));
        break;
      case SortType.PRICE_DOWN:
        sortedPoints = points.slice().sort((a, b) => b.price - a.price);
        break;
      case SortType.DEFAULT:
        sortedPoints = [].concat(points);
        this._isDefaultSorting = true;
        this._groupingByDay(sortedPoints);
        break;
    }

    const dayListComponent = this._dayListComponent.getElement();
    dayListComponent.innerHTML = ``;

    if (!this._isDefaultSorting) {
      this._renderDay(dayListComponent, this._dateList, sortedPoints);
      return;
    }
    this.render();
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

    this._showedPointsControllers = this._showedPointsControllers.concat(newPoints);
  }

  _onDataChange(pointController, oldData, newData) {
    const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);

    if (isSuccess) {
      pointController.render(newData);
    }
  }

  _onViewChange() {
    this._showedPointsControllers.forEach((point) => {
      point.setDefaultView();
    });
  }

  _onFilterChange() {
    const dayListComponent = this._dayListComponent.getElement();
    dayListComponent.innerHTML = ``;
    this._removePoints();
    this._renderDay(dayListComponent, null, this._pointsModel.getPoints());
  }

  _removePoints() {
    this._showedPointsControllers.forEach((pointController) => pointController.destroy());
    this._showedPointsControllers = [];
  }
}
