import {createElement, formatDateTime} from "../utils";
import {MonstList} from "../const";

const createDateMarkup = (date) => {
  return (
    `<div class="day__info">
      <span class="day__counter">${date.getDate()}</span>
      <time class="day__date" datetime="${formatDateTime(date).date}">
        ${MonstList[date.getMonth()]} ${String(date.getFullYear()).slice(2)}
      </time>
    </div>`
  );
};

const createDayTemplate = (date) => {
  return (
    `<li class="trip-days__item  day">
      ${createDateMarkup(date)}
    </li>`
  );
};


export default class DayItem {
  constructor(date) {
    this._date = date;
    this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this._date);
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
