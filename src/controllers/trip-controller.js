import SortComponent from '../components/sort.js';
import {SortType} from '../components/sort.js';
import DayListComponent from '../components/day-list.js';
import DayComponent from '../components/day.js';
import PointListComponent from '../components/point-list.js';
import PointEditComponent from '../components/point-edit.js';
import PointComponent from '../components/point.js';
import NoPointComponent from '../components/no-point.js';
import {render} from '../utils/render.js';
import {RenderPosition} from '../utils/render.js';
import {replace} from '../utils/render.js';
import {formatDateTime} from '../utils/date';

const renderPoint = (pointListComponent, point) => {
  const replaceEditToPoint = () => {
    replace(pointComponent, pointEditComponent);
  };


  const replacePointToEdit = () => {
    replace(pointEditComponent, pointComponent);
  };


  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.kay === `Esc`;
    if (isEscKey) {
      replaceEditToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };


  const onOpenForm = () => {
    const dayElement = document.querySelector(`.trip-days`);
    if (!dayElement.querySelector(`form`)) {
      replacePointToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  };


  const onCloseForm = () => {
    replaceEditToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };


  const pointComponent = new PointComponent(point);
  pointComponent.setOpenEditButtonClickHandler(onOpenForm);

  const pointEditComponent = new PointEditComponent(point);
  pointEditComponent.setSubmitHandler(onCloseForm);
  pointEditComponent.setCloseEditButtonClickHandler(onCloseForm);

  render(pointListComponent, pointComponent, RenderPosition.BEFOREEND);
};


const renderPoints = (pointListComponent, points) => {
  points.forEach((point) => {
    renderPoint(pointListComponent, point);
  });
};


const renderDay = (dayListComponent, points, date, isDefaultSorting) => {
  const currentPoints = isDefaultSorting
    ? points.slice().filter((point) => formatDateTime(point.dateStart).date === date)
    : points.slice();

  const dayElement = isDefaultSorting
    ? new DayComponent(currentPoints[0].dateStart)
    : new DayComponent();

  const pointListElement = new PointListComponent();

  render(dayListComponent, dayElement, RenderPosition.BEFOREEND);
  render(dayElement.getElement(), pointListElement, RenderPosition.BEFOREEND);
  renderPoints(pointListElement.getElement(), currentPoints);
};


const renderDays = (dayListComponent, points, isDefaultSorting = true) => {
  const dates = isDefaultSorting
    ? new Set(points.map((point) => formatDateTime(point.dateStart).date))
    : [true];
  dates.forEach((date) => {
    renderDay(dayListComponent, points, date, isDefaultSorting);
  });
};


export default class TripController {
  constructor(container) {
    this._container = container;

    this._noPointComponent = new NoPointComponent();
    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();
  }

  render(points) {
    const container = this._container;

    if (!points.length) {
      render(container, this._noPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._dayListComponent, RenderPosition.BEFOREEND);

    const dayListElement = this._dayListComponent.getElement();

    renderDays(dayListElement, points);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedPoints = [];
      let isDefaultSorting = false;

      switch (sortType) {
        case SortType.TIME_DOWN:
          sortedPoints = points.slice().sort((a, b) => (b.dateEnd - b.dateStart) - (a.dateEnd - a.dateStart));
          break;
        case SortType.PRICE_DOWN:
          sortedPoints = points.slice().sort((a, b) => b.price - a.price);
          break;
        case SortType.DEFAULT:
          sortedPoints = points.slice();
          isDefaultSorting = true;
          break;
      }

      dayListElement.innerHTML = ``;

      renderDays(dayListElement, sortedPoints, isDefaultSorting);
    });
  }
}
