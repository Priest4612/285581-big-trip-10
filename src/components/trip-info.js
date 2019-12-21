import {MonthList} from "../const";
import AbstractComponent from "./abstract-component";


const createTripInfoTemplate = (startTrip, endTrip) => {
  let template = null;
  let intervalDateTemplate = null;
  if (!startTrip && !endTrip) {
    // моя заглушка
    template = `<p></p>`;
  } else {
    const startLocation = startTrip.locationList.filter((it)=>it.checked);
    const endLocation = endTrip.locationList.filter((it)=>it.checked);

    const startMonth = MonthList[startTrip.dateStart.getMonth()];
    const startDate = startTrip.dateStart.getDate();
    const endMonth = MonthList[endTrip.dateEnd.getMonth()];
    const endDate = endTrip.dateEnd.getDate();

    if (startMonth !== endMonth) {
      intervalDateTemplate = `${startMonth} ${startDate}&nbsp;&mdash;&nbsp;${endMonth} ${endDate}`;
    } else {
      intervalDateTemplate = `${startMonth} ${startDate}&nbsp;&mdash;&nbsp;${endDate}`;
    }
    template = `<div class="trip-info__main">
      <h1 class="trip-info__title">
        ${startLocation[0].title}
        &mdash; ... &mdash;
        ${endLocation[0].title}
      </h1>

      <p class="trip-info__dates">
        ${intervalDateTemplate}
      </p>
    </div>`;
  }

  return template;
};


export default class TripInfoComponent extends AbstractComponent {
  constructor(startTrip, endTrip) {
    super();

    this._startTrip = startTrip;
    this._endTrip = endTrip;
  }

  getTemplate() {
    return createTripInfoTemplate(this._startTrip, this._endTrip);
  }
}
