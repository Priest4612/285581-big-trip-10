import {formatDateTime} from "../utils/date.js";
import DayComponent from "../components/day.js";
import PointListComponent from "../components/point-list.js";
import {render, RenderPosition} from "../utils/render.js";
import PointController from "./point-controller.js";

export default class DayListController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._dateList = null;
  }

  render(points, isDefaultSorting) {
    if (isDefaultSorting) {
      this._groupingByDay(points);
      this._dateList.forEach((date) => {
        const currentPoints = points.slice().filter((point) => formatDateTime(point.dateStart).date === date);
        this._renderDay(currentPoints[0].dateStart, currentPoints);
      });
      return;
    }

    this._renderDay(this._dateList, points);
  }

  _groupingByDay(points) {
    this._dateList = new Set(points.map((point) => formatDateTime(point.dateStart).date));
  }

  _renderDay(date, points) {
    const dayComponent = new DayComponent(date);
    const pointListComponent = new PointListComponent();

    render(this._container, dayComponent, RenderPosition.BEFOREEND);
    render(dayComponent.getElement(), pointListComponent, RenderPosition.BEFOREEND);

    points.map((point) => {
      const pointController = new PointController(pointListComponent.getElement(), this._onDataChange);
      pointController.render(point);
    });
  }
}
