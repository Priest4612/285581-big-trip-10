import {FilterList} from '../const.js';
import FilterComponent from '../components/filter.js';
import {render, RenderPosition} from '../utils/render.js';

export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._activeFilterType = FilterList.EVERYTHING;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const container = this._container;

    const filters = Object.values(FilterList).map((filterType) => {
      return {
        name: filterType,
        checked: filterType === this._activeFilterType
      };
    });


    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);
    render(container, this._filterComponent, RenderPosition.AFTEREND);
  }

  _onFilterChange(filterType) {
    this._pointsModel.setFilter(filterType);
    this._activeFilterTyoe = filterType;
  }
}
