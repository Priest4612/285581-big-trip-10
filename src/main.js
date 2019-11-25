const EVENT_COUNT = 3;

import {createTripInfoTemplate} from './components/trip-info.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createSortTemplate} from './components/sort.js';
import {createEventListTemplate} from './components/event-list.js';
import {createEventEditTemplate} from './components/event-edit.js';
import {createEventTemplate} from './components/event.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const sitePageBodyElement = document.querySelector(`.page-body`);
const siteHeaderElement = sitePageBodyElement.querySelector(`.page-header`);
const headerTripInfoElement = siteHeaderElement.querySelector(`.trip-info`);
const headerTripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const headerHiddenElements = headerTripControlsElement.querySelectorAll(`.visually-hidden`);

render(headerTripInfoElement, createTripInfoTemplate(), `afterbegin`);
render(headerHiddenElements[0], createSiteMenuTemplate(), `afterend`);
render(headerHiddenElements[1], createFilterTemplate(), `afterend`);

const siteMainElement = sitePageBodyElement.querySelector(`.page-main`);
const mainTripEventsElement = siteMainElement.querySelector(`.trip-events`);

render(mainTripEventsElement, createSortTemplate(), `beforeend`);
render(mainTripEventsElement, createEventListTemplate(), `beforeend`);

const eventListElement = mainTripEventsElement.querySelector(`.trip-days`);

render(eventListElement, createEventEditTemplate(), `beforeend`);

new Array(EVENT_COUNT).fill().forEach(
    () => {
      render(eventListElement, createEventTemplate(), `beforeend`);
    }
);
