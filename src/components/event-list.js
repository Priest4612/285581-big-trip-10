import AbstractComponent from "./abstract-component";

const createEventListTemplate = () => {
  return (
    `<ul class="trip-events__list">

    </ul>`
  );
};


export default class EventListComponent extends AbstractComponent {
  getTemplate() {
    return createEventListTemplate();
  }
}
