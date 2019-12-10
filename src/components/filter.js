import {FilterList} from '../const.js';

const createFilterItem = (filterItem) => {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything"
      ${filterItem.checked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-everything">${filterItem.title}</label>
    </div>`
  );
};


const filterListMurkup = (filterList) => {
  return Array
  .from(filterList)
  .map((filterItem) => {
    return createFilterItem(filterItem);
  }).join(`\n`);
};


export const createFilterTemplate = () => {
  return (
    `<form class="trip-filters" action="#" method="get">

      ${filterListMurkup(FilterList)}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
