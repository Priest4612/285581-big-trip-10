import {MenuList} from '../const.js';
import AbstractComponent from './abstract-component.js';


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

export default class MenuComponent extends AbstractComponent {
  getTemplate() {
    return createSiteMenuTemplate();
  }
}
