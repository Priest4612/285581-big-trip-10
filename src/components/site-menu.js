import {MenuList} from '../const.js';

const createMenuItem = (menuItem) => {
  return (
    `<a class="trip-tabs__btn trip-tabs__btn${menuItem.active ? `--active` : ``}" href="#">${menuItem.title}</a>`
  );
};


const menuListMurkup = (menuList) => {
  return Array
  .from(menuList)
  .map((menuItem) => {
    return createMenuItem(menuItem);
  }).join(`\n`);
};


export const createSiteMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">

      ${menuListMurkup(MenuList)}

    </nav>`
  );
};
