import {formatTime} from '../utils.js';
import {castTimeFormat} from '../utils.js';
import {createElement} from '../utils.js';

const getDurationEvent = (start, end) => {
  const duration = new Date(end - start);
  const day = duration.getDay();
  const hours = duration.getHours();
  const minutes = duration.getMinutes();

  return `${day > 0 ? castTimeFormat(day) + `D ` : ``}${castTimeFormat(hours)}H ${(castTimeFormat(minutes))}M`;
};


const createOfferItem = (offer) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`
  );
};


const createOfferListMarkup = (offerList) => {
  return Array
  .from(offerList.filter((it) => it.checked))
  .map((offer) => {
    return createOfferItem(offer);
  }).join(`\n`);
};


const createEventTemplate = (event) => {
  const {eventList, locationList, dateStart, dateEnd, price, offerList} = event;
  const activeEvent = eventList.filter((it) => it.checked)[0];
  const activeLocationList = locationList.filter((it) => it.checked)[0];

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${activeEvent.title}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${activeEvent.title} to ${activeLocationList.title}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${formatTime(dateStart)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${formatTime(dateEnd)}</time>
          </p>
          <p class="event__duration">${getDurationEvent(dateStart, dateEnd)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">

          ${createOfferListMarkup(offerList)}

        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};


export default class EventElement {
  constructor(event) {
    this._event = event;

    this._element = null;
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
