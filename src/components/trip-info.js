import {createElement} from "../utils";


const createTripInfoTemplate = () => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; ... &mdash; Amsterdam</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
    </div>`
  );
};


export default class TripInfoElement {
  consturctor(startTrip, endTrip) {
    this._start = startTrip;
    this._end = endTrip;

    this._element = null;
  }

  getTemplate() {
    // console.log(this._start);
    // console.log(this._start);
    return createTripInfoTemplate();
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
