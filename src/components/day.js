import AbstractComponent from "./abstract-component.js";
import {formatDateTime} from "../utils/date.js";
import {MonthList} from "../const";

const createDateMarkup = (date) => {
  if (!date) {
    return `<div class="day__info"></div>`;
  }

  return (
    `<div class="day__info">
      <span class="day__counter">${date.getDate()}</span>
      <time class="day__date" datetime="${formatDateTime(date).date}">
      ${MonthList[date.getMonth()]} ${String(date.getFullYear()).slice(2)}
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


export default class DayComponent extends AbstractComponent {
  constructor(date) {
    super();

    this._date = date ? date : null;
  }

  getTemplate() {
    return createDayTemplate(this._date);
  }
}
