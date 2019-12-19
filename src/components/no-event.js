import {createElement} from "../utils";

const createNoEventTemplate = () => {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
};

export default class NoEventElement {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoEventTemplate();
  }

  getElement() {
    if (!this._elemeny) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
