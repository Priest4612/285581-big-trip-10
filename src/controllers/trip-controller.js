import SortComponent from '../components/sort.js';
import {SortType} from '../components/sort.js';
import DayListComponent from '../components/day-list.js';
import NoPointComponent from '../components/no-point.js';
import {render} from '../utils/render.js';
import {RenderPosition} from '../utils/render.js';
import DayListController from './day-list-controller.js';


export default class TripController {
  constructor(container) {
    this._container = container;

    this._points = [];
    this._isDefaultSorting = true;

    this._noPointComponent = new NoPointComponent();
    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
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

    const dayListComponent = this._dayListComponent.getElement();

    const dayListController = new DayListController(dayListComponent, this._onDataChange);
    dayListController.render(this._points, this._isDefaultSorting);
  }

  _onSortTypeChange(sortType) {
    let sortedPoints = [];
    this._isDefaultSorting = false;

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

    const dayListController = new DayListController(dayListComponent);
    dayListController.render(sortedPoints, this._isDefaultSorting);
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
