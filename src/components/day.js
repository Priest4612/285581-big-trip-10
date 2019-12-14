import {createElement} from "../utils";

const createDateMarkup = () => {
  return (
    `<div class="day__info">
      <span class="day__counter">1</span>
      <time class="day__date" datetime="2019-03-18">MAR 18</time>
    </div>`
  );
};

const createDayTemplate = () => {
  return (
    `<li class="trip-days__item  day">
      ${createDateMarkup()}
    </li>`
  );
};


export default class DayItem {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDayTemplate();
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
