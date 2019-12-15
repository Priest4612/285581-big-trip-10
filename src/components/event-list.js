import {createElement} from "../utils";

const createEventListTemplate = () => {
  return (
    `<ul class="trip-events__list">

    </ul>`
  );
};


export default class EventContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventListTemplate();
  }

  getElement() {
    if (!this.element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
