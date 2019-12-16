import {MenuList} from '../const.js';
import {createElement} from "../utils";


const createMenuItem = (menuItem) => {
  return (
    `<a class="trip-tabs__btn trip-tabs__btn${menuItem.active ? `--active` : ``}" href="#">${menuItem.title}</a>`
  );
};


const createMenuListMurkup = (menuList) => {
  return Array
  .from(menuList)
  .map((menuItem) => {
    return createMenuItem(menuItem);
  }).join(`\n`);
};


const createSiteMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${createMenuListMurkup(MenuList)}
    </nav>`
  );
};

export default class MenuElement {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate();
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
