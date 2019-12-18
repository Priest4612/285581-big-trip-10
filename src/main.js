import {data} from './mock/data.js';
import TripInfoElement from './components/trip-info.js';
import MenuElement from './components/site-menu.js';
import FilterElement from './components/filter.js';
import SortElement from './components/sort.js';
import DayListElement from './components/day-list.js';
import DayItem from './components/day.js';
import EventContainer from './components/event-list.js';
import EventEditElement from './components/event-edit.js';
import EventElement from './components/event.js';
import {render} from './utils.js';
import {RenderPosition} from './utils.js';
import NoEventElement from './components/no-event.js';


const calculationTotal = (events) => {
  let total = 0;
  events.forEach((event) => {
    total += event.price;
  });

  return total;
};


const renderEvent = (eventListElement, event) => {
  const replaceEditToEvent = () => {
    eventListElement.replaceChild(eventElement.getElement(), eventEditElement.getElement());
  };


  const replaceEventToEdit = () => {
    eventListElement.replaceChild(eventEditElement.getElement(), eventElement.getElement());
  };


  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.kay === `Esc`;
    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };


  const eventElement = new EventElement(event);
  const openEditButton = eventElement.getElement().querySelector(`.event__rollup-btn`);

  openEditButton.addEventListener(`click`, () => {
    const dayElement = document.querySelector(`.trip-days`);
    if (!dayElement.querySelector(`form`)) {
      replaceEventToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
      eventEditElement.getElement().removeEventListener(`submit`, replaceEditToEvent);
    }
  });

  const eventEditElement = new EventEditElement(event);
  const closeEditButton = eventEditElement.getElement().querySelector(`.event__rollup-btn`);

  closeEditButton.addEventListener(`click`, () => {
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventEditElement.getElement().addEventListener(`submit`, replaceEditToEvent);

  render(eventListElement, eventElement.getElement(), RenderPosition.BEFOREEND);
};

const events = data;

const sitePageBodyElement = document.querySelector(`.page-body`);
const siteHeaderElement = sitePageBodyElement.querySelector(`.page-header`);
const headerTripInfoElement = siteHeaderElement.querySelector(`.trip-info`);
render(headerTripInfoElement, new TripInfoElement().getElement(), RenderPosition.AFTERBEGIN);
const spanTripInfoElement = headerTripInfoElement.querySelector(`.trip-info__cost-value`);

const headerTripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const headerHiddenElements = headerTripControlsElement.querySelectorAll(`.visually-hidden`);
render(headerHiddenElements[0], new MenuElement().getElement(), RenderPosition.AFTEREND);
render(headerHiddenElements[1], new FilterElement().getElement(), RenderPosition.AFTEREND);

const siteMainElement = sitePageBodyElement.querySelector(`.page-main`);
const mainTripEventsElement = siteMainElement.querySelector(`.trip-events`);


const groupEventDate = [];
let currentDate = null;
events.forEach((event) => {
  if (!currentDate || currentDate.getDate() !== event.dateStart.getDate()) {
    currentDate = event.dateStart;
    const Data = {};
    Data.date = currentDate;
    const array = events.filter((it) => it.dateStart.getDate() === currentDate.getDate());
    Data.events = array;
    groupEventDate.push(Data);
  }
});

if (groupEventDate.length > 0) {
  render(mainTripEventsElement, new SortElement().getElement(), RenderPosition.BEFOREEND);
  render(mainTripEventsElement, new DayListElement().getElement(), RenderPosition.BEFOREEND);

  const dayListElement = mainTripEventsElement.querySelector(`.trip-days`);

  groupEventDate.forEach((day) => {
    render(dayListElement, new DayItem(day.date).getElement(), RenderPosition.BEFOREEND);
    const days = dayListElement.querySelectorAll(`.day`);
    const dayElement = days[days.length - 1];
    render(dayElement, new EventContainer().getElement(), RenderPosition.BEFOREEND);
    const eventListElement = dayElement.querySelector(`.trip-events__list`);
    day.events.forEach((event) => {
      renderEvent(eventListElement, event);
    });
  });

  spanTripInfoElement.innerHTML = calculationTotal(events);
} else {
  render(mainTripEventsElement, new NoEventElement().getElement(), RenderPosition.BEFOREEND);
}
