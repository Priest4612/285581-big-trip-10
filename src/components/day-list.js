import {createElement} from "../utils";

const createDayListTemplate = () => {
  return (
    `<ul class="trip-days">

    </ul>`
  );
};


export default class DayListContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDayListTemplate();
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
