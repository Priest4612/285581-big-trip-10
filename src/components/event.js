import {getRandomInteger} from '../utils.js';
import {formatTime} from '../utils.js';
import {castTimeFormat} from '../utils.js';

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


const offerListMarkup = (offerList) => {
  const OFFERS_MIN_COUNT = 0;
  const OFFERS_MAX_COUNT = 2;

  return Array
  .from(offerList.slice(0, getRandomInteger(OFFERS_MIN_COUNT, OFFERS_MAX_COUNT)))
  .map((offer) => {
    return createOfferItem(offer);
  }).join(`\n`);
};

export const createEventTemplate = (event) => {
  const {type, location, dateStart, dateEnd, price, offerList} = event;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} to ${location}</h3>

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

          ${offerListMarkup(offerList)}

        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
