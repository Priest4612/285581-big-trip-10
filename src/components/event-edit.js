import {TransferList, ActivityList, Cities} from '../const.js';
import {generateEvent} from '../mock/event-mock.js';
import {formatDateTime} from '../utils.js';

const randomEvent = generateEvent();

const createEventItem = (eventType) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${eventType.title}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType.title}"
      ${eventType.title.checked ? `cheched` : ``}>
      <label class="event__type-label  event__type-label--${eventType.title}" for="event-type-${eventType.title}-1">${eventType.title[0].toUpperCase() + eventType.title.slice(1)}</label>
    </div>`
  );
};


const eventListMarkup = (eventList) => {
  const arr = eventList.slice();
  arr.map((it) => {
    if (it.title === randomEvent.type.title) {
      it.checked = true;
    } else {
      it.checked = false;
    }
  });

  return Array
  .from(arr)
  .map((eventType) => {
    return createEventItem(eventType);
  }).join(`\n`);
};

const createCityItem = (city) => {
  return (
    `<option value="${city}"></option>`
  );
};

const destinationListMarkup = (cityList) => {
  const arr = cityList.slice();
  arr.filter((item) => item.location !== randomEvent.city.location);

  return Array
  .from(arr)
  .map((eventType) => {
    return createCityItem(eventType);
  }).join(`\n`);
};


const createOfferItem = (offer) => {
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-1" type="checkbox" name="event-offer-${offer.type}" ${offer.checked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${offer.type}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  );
};


const offerListMarkup = (offerList) => {
  return Array
  .from(offerList)
  .map((offer) =>{
    return createOfferItem(offer);
  }).join(`\n`);
};


const createPhotoItem = (urlPhoto) => {
  return (
    `<img class="event__photo" src="${urlPhoto}" alt="Event photo">`
  );
};


const photoListMarkup = (urlPhotoList) => {
  return Array
  .from(urlPhotoList)
  .map((urlPhoto) =>{
    return createPhotoItem(urlPhoto);
  }).join(`\n`);
};


export const createEventEditTemplate = () => {
  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${randomEvent.type.title}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>

                ${eventListMarkup(TransferList)}

              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                ${eventListMarkup(ActivityList)}

              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              Sightseeing at
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${randomEvent.city.location}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationListMarkup(Cities)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDateTime(randomEvent.dateStart)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDateTime(randomEvent.dateEnd)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${randomEvent.price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite"
          ${randomEvent.isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">

          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">

              ${offerListMarkup(randomEvent.offersAvailable)}

            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${randomEvent.description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">

                ${photoListMarkup(randomEvent.photos)}

              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};
