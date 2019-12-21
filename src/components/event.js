import {formatTime} from '../utils.js';
import {castTimeFormat} from '../utils.js';
import AbstractComponent from './abstract-component.js';

const getDurationEvent = (start, end) => {
  const duration = end - start;
  const day = Math.floor(duration / (24 * 60 * 60 * 1000));
  const hours = Math.floor(duration % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
  const minutes = Math.ceil(duration % (60 * 60 * 1000) / (60 * 1000));

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


const createOfferListMarkup = (offers) => {
  return Array
  .from(offers.filter((it) => it.checked))
  .map((offer) => {
    return createOfferItem(offer);
  }).join(`\n`);
};


const createEventTemplate = (event) => {
  const {eventList, locationList, dateStart, dateEnd, price, offerList} = event;
  const ActiveEvent = eventList.filter((it) => it.checked)[0];
  const ActiveLocation = locationList.filter((it) => it.checked)[0];

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${ActiveEvent.title}.png" alt="event type icon">
        </div>
        <h3 class="event__title">${ActiveEvent.title} to ${ActiveLocation.title}</h3>

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


export default class EventElement extends AbstractComponent {
  constructor(event) {
    super();

    this._event = event;
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }
}
