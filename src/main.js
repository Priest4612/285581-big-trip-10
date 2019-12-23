import {data} from './mock/data.js';
import TripInfoElement from './components/trip-info.js';
import MenuElement from './components/site-menu.js';
import FilterElement from './components/filter.js';
import TripController from './controllers/trip-controller.js';
import {render} from './utils/render.js';
import {RenderPosition} from './utils/render.js';


const calculationTotal = (points) => {
  let total = 0;
  if (!points) {
    return total;
  }

  points.forEach((point) => {
    total += point.price;
  });

  return total;
};


const points = data;

const sitePageBodyElement = document.querySelector(`.page-body`);
const siteHeaderElement = sitePageBodyElement.querySelector(`.page-header`);
const headerTripInfoElement = siteHeaderElement.querySelector(`.trip-info`);

const startTrip = points[0] ? points[0] : null;
const endTrip = points[points.length - 1] ? points[points.length - 1] : null;
render(headerTripInfoElement, new TripInfoElement(startTrip, endTrip), RenderPosition.AFTERBEGIN);
const spanTripInfoElement = headerTripInfoElement.querySelector(`.trip-info__cost-value`);
spanTripInfoElement.innerHTML = calculationTotal(points);

const headerTripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const headerHiddenElements = headerTripControlsElement.querySelectorAll(`.visually-hidden`);
render(headerHiddenElements[0], new MenuElement(), RenderPosition.AFTEREND);
render(headerHiddenElements[1], new FilterElement(), RenderPosition.AFTEREND);

const siteMainElement = sitePageBodyElement.querySelector(`.page-main`);
const mainTripEventsElement = siteMainElement.querySelector(`.trip-events`);

const tripController = new TripController(mainTripEventsElement);
tripController.render(points);
