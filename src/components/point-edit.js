import {formatDateTime} from '../utils/date.js';
import {getRandomArrayItem} from '../utils/common.js';
import AbstractSmartComponent from './abstract-smart-component.js';
import {generateDescription, generatePhotos} from '../mock/point-mock.js';


const createTemplateListMarkup = (cb, dataList, group = ``) => {
  let array = [];

  if (group !== ``) {
    const tempArray = dataList.filter((item) => item.group === group);
    array = [].concat(tempArray);
  } else {
    array = [].concat(dataList);
  }

  return Array.from(array)
    .map((item) => cb(item))
    .join(`\n`);
};


const createPointItem = (point) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${point.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${point.type}"
      ${point.checked ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${point.type}" for="event-type-${point.type}-1">${point.title[0].toUpperCase() + point.title.slice(1)}</label>
    </div>`
  );
};


const createCityItem = (city) => {
  return (
    `<option value="${city.title}"></option>`
  );
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


const createOfferListMarkup = (offers) => {
  const OFFERS_AVAILABLE_COUNT = 5;
  const newArray = offers.filter((offer) => offer.checked);

  for (let index = newArray.length; index < OFFERS_AVAILABLE_COUNT; index++) {
    const element = getRandomArrayItem(offers.filter((offer) => !offer.checked));
    newArray.push(element);
  }

  return Array.from(newArray)
    .map((offer) => createOfferItem(offer))
    .join(`\n`);
};


const createPhotoItem = (urlPhoto) => {
  return (
    `<img class="event__photo" src="${urlPhoto}" alt="event photo">`
  );
};


const createPhotoListMarkup = (urlPhotoList) => {
  return Array.from(urlPhotoList)
    .map((urlPhoto) => createPhotoItem(urlPhoto))
    .join(`\n`);
};


const createPointEditTemplate = (point) => {
  const {pointList, isFavorite, locationList, dateStart, dateEnd, price, offerList, description, photos} = point;
  const ActivePoint = pointList.filter((it) => it.checked)[0];
  const ActiveLocation = locationList.filter((location) => location.checked)[0];

  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${ActivePoint.type}.png" alt="event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>

                ${createTemplateListMarkup(createPointItem, pointList, `transfer`)}

              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                ${createTemplateListMarkup(createPointItem, pointList, `activity`)}

              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              Sightseeing at
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${ActiveLocation.title}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${createTemplateListMarkup(createCityItem, locationList)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDateTime(dateStart).dateTimeEdit}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDateTime(dateEnd).dateTimeEdit}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite"
          ${isFavorite ? `checked` : ``}>
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

              ${createOfferListMarkup(offerList)}

            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">

                ${createPhotoListMarkup(photos)}

              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};


export default class PointEditComponent extends AbstractSmartComponent {
  constructor(point) {
    super();

    this._point = point;

    this._setSubmitFormHandler = null;
    this._setClickCloseEditButtonHandler = null;
    this._setChangeFavoriteInputHandler = null;

    this._onChangeTypePoint();
    this._onChangeLocationPoint();
  }

  getTemplate() {
    return createPointEditTemplate(this._point);
  }

  setSubmitFormHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);

    this._setSubmitFormHandler = handler;
  }

  setClickCloseEditButtonHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);

    this._setClickCloseEditButtonHandler = handler;
  }

  setChangeFavoriteInputHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`)
      .addEventListener(`change`, handler);

    this._setChangeFavoriteInputHandler = handler;
  }

  recoveryListeners() {
    this._onChangeTypePoint();
    this._onChangeLocationPoint();

    this.setSubmitFormHandler(this._setSubmitFormHandler);
    this.setClickCloseEditButtonHandler(this._setClickCloseEditButtonHandler);
    this.setChangeFavoriteInputHandler(this._setChangeFavoriteInputHandler);
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this.rerender();
  }

  _onChangeTypePoint() {
    const eventTypeInputs = this.getElement()
      .querySelectorAll(`.event__type-input`);

    [...eventTypeInputs].forEach((input) => {
      input.addEventListener(`change`, (evt) => {
        const newType = evt.target.value;

        const indexNewType = this._point.pointList.findIndex((it) => it.type === newType);
        const indexCurrentType = this._point.pointList.findIndex((it) => it.checked);

        if (indexNewType === -1) {
          return;
        }

        this._point.pointList[indexCurrentType].checked = false;
        this._point.pointList[indexNewType].checked = true;

        this.rerender();
      });
    });
  }

  _onChangeLocationPoint() {
    this.getElement()
    .querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      const newCity = evt.target.value;

      const indexNewType = this._point.locationList.findIndex((it) => it.title === newCity);
      const indexCurrentType = this._point.locationList.findIndex((it) => it.checked);

      if (indexNewType === -1) {
        return;
      }

      this._point.locationList[indexCurrentType].checked = false;
      this._point.locationList[indexNewType].checked = true;
      this._point.description = generateDescription();
      this._point.photos = generatePhotos();

      this.rerender();
    });
  }
}
