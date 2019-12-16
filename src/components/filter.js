import {FILTER_LIST} from '../const.js';
import {createElement} from '../utils.js';

const createFilterItem = (filterItem) => {
  return (
    `<div class="trip-filters__filter">
      <input
      id="filter-${filterItem.title}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="-${filterItem.title}"
      ${filterItem.checked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-everything">${filterItem.title}</label>
    </div>`
  );
};


const createFilterListMurkup = (filterList) => {
  return Array
  .from(filterList)
  .map((filterItem) => {
    return createFilterItem(filterItem);
  }).join(`\n`);
};


const createFilterTemplate = () => {
  return (
    `<form class="trip-filters" action="#" method="get">

      ${createFilterListMurkup(FILTER_LIST)}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FilterElement {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate();
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
