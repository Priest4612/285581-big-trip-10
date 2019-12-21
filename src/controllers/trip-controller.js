import SortComponent from '../components/sort.js';
import DayListComponent from '../components/day-list.js';
import DayComponent from '../components/day.js';
import EventListComponent from '../components/event-list.js';
import EventEditComponent from '../components/event-edit.js';
import EventComponent from '../components/event.js';
import {render} from '../utils/render.js';
import {RenderPosition} from '../utils/render.js';
import {replace} from '../utils/render.js';
import NoEventComponent from '../components/no-event.js';

const renderEvent = (eventListComponent, event) => {
  const replaceEditToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };


  const replaceEventToEdit = () => {
    replace(eventEditComponent, eventComponent);
  };


  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.kay === `Esc`;
    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };


  const onOpenForm = () => {
    const dayElement = document.querySelector(`.trip-days`);
    if (!dayElement.querySelector(`form`)) {
      replaceEventToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  };


  const onCloseForm = () => {
    replaceEditToEvent();
    document.addEventListener(`keydown`, onEscKeyDown);
  };


  const eventComponent = new EventComponent(event);
  eventComponent.setOpenEditButtonClickHandler(onOpenForm);

  const eventEditComponent = new EventEditComponent(event);
  eventEditComponent.setSubmitHandler(onCloseForm);
  eventEditComponent.setCloseEditButtonClickHandler(onCloseForm);

  render(eventListComponent, eventComponent, RenderPosition.BEFOREEND);
};


const renderEvents = (eventListComponent, events) => {
  events.forEach((event) => {
    renderEvent(eventListComponent, event);
  });
};


const renderDay = (dayListComponent, day) => {
  const dayElement = new DayComponent(day.date);
  const eventListElement = new EventListComponent();

  render(dayListComponent, dayElement, RenderPosition.BEFOREEND);

  render(dayElement.getElement(), eventListElement, RenderPosition.BEFOREEND);

  renderEvents(eventListElement.getElement(), day.events);
};


const renderDays = (dayListComponent, days) => {
  days.forEach((day) => {
    renderDay(dayListComponent, day);
  });
};


export default class TripController {
  constructor(container) {
    this._container = container;

    this._noEventComponent = new NoEventComponent();
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
      render(container, this._noEventComponent, RenderPosition.BEFOREEND);
    }
  }
}
