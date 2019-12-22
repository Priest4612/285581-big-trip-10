import AbstractComponent from "./abstract-component";

const createPointListTemplate = () => {
  return (
    `<ul class="trip-events__list">

    </ul>`
  );
};


export default class PointListComponent extends AbstractComponent {
  getTemplate() {
    return createPointListTemplate();
  }
}
