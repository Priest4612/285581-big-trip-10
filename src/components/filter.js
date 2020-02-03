import {FilterList} from '../const.js';
import AbstractComponent from './abstract-component.js';

const createFilterItem = (filterItem) => {
  return (
    `<div class="trip-filters__filter">
      <input
      id="filter-${filterItem.value}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${filterItem.value}"
      ${filterItem.checked}>
      <label class="trip-filters__filter-label" for="filter-${filterItem.value}" data-filter="${filterItem.value}">${filterItem.value}</label>
    </div>`
  );
};


const createFilterListMurkup = (filterList) => {
  return Object
  .values(filterList)
  .map((filterItem) => {
    return createFilterItem(filterItem);
  }).join(`\n`);
};


const createFilterTemplate = () => {
  return (
    `<form class="trip-filters" action="#" method="get">

      ${createFilterListMurkup(FilterList)}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FilterComponent extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate();
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `LABEL`) {
        const filter = evt.target.dataset.filter;
        handler(filter);
      }
    });
  }
}
