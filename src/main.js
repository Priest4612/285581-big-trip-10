import {data} from './mock/data.js';
import TripInfoElement from './components/trip-info.js';
import MenuElement from './components/site-menu.js';
import FilterElement from './components/filter.js';
import TripController from './controllers/trip-controller.js';
import {render} from './utils/render.js';
import {RenderPosition} from './utils/render.js';


const calculationTotal = (events) => {
  let total = 0;
  if (events) {
    total = 0;
  }

  events.forEach((event) => {
    total += event.price;
  });

  return total;
};


const sortDataByDate = (data) => {
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

  return groupEventDate;
};


const events = data;

const sitePageBodyElement = document.querySelector(`.page-body`);
const siteHeaderElement = sitePageBodyElement.querySelector(`.page-header`);
const headerTripInfoElement = siteHeaderElement.querySelector(`.trip-info`);

const startTrip = events[0] ? events[0] : null;
const endTrip = events[events.length - 1] ? events[events.length - 1] : null;
render(headerTripInfoElement, new TripInfoElement(startTrip, endTrip), RenderPosition.AFTERBEGIN);
const spanTripInfoElement = headerTripInfoElement.querySelector(`.trip-info__cost-value`);
spanTripInfoElement.innerHTML = calculationTotal(events);

const headerTripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const headerHiddenElements = headerTripControlsElement.querySelectorAll(`.visually-hidden`);
render(headerHiddenElements[0], new MenuElement(), RenderPosition.AFTEREND);
render(headerHiddenElements[1], new FilterElement(), RenderPosition.AFTEREND);

const siteMainElement = sitePageBodyElement.querySelector(`.page-main`);
const mainTripEventsElement = siteMainElement.querySelector(`.trip-events`);

const tripController = new TripController(mainTripEventsElement);
tripController.render(sortDataByDate(data));
