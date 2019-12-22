import SortComponent from '../components/sort.js';
import DayListComponent from '../components/day-list.js';
import DayComponent from '../components/day.js';
import PointListComponent from '../components/point-list.js';
import PointEditComponent from '../components/point-edit.js';
import PointComponent from '../components/point.js';
import {render} from '../utils/render.js';
import {RenderPosition} from '../utils/render.js';
import {replace} from '../utils/render.js';
import NoPointComponent from '../components/no-point.js';

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
    document.addEventListener(`keydown`, onEscKeyDown);
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


const renderDay = (dayListComponent, day) => {
  const dayElement = new DayComponent(day.date);
  const pointListElement = new PointListComponent();

  render(dayListComponent, dayElement, RenderPosition.BEFOREEND);

  render(dayElement.getElement(), pointListElement, RenderPosition.BEFOREEND);

  renderPoints(pointListElement.getElement(), day.points);
};


const renderDays = (dayListComponent, days) => {
  days.forEach((day) => {
    renderDay(dayListComponent, day);
  });
};


export default class TripController {
  constructor(container) {
    this._container = container;

    this._noPointComponent = new NoPointComponent();
    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();
  }

  render(days) {
    const container = this._container;

    if (days.length > 0) {
      render(container, this._sortComponent, RenderPosition.BEFOREEND);
      render(container, this._dayListComponent, RenderPosition.BEFOREEND);

      const dayListElement = this._dayListComponent.getElement();

      renderDays(dayListElement, days);
    } else {
      render(container, this._noPointComponent, RenderPosition.BEFOREEND);
    }
  }
}
