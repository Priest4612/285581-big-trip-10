import AbstractComponent from "./abstract-component.js";

const createDayListTemplate = () => {
  return (
    `<ul class="trip-days">

    </ul>`
  );
};


export default class DayListContainer extends AbstractComponent {
  getTemplate() {
    return createDayListTemplate();
  }
}
