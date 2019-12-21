import AbstractComponent from "./abstract-component";

const createNoEventTemplate = () => {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
};

export default class NoEventElement extends AbstractComponent {
  getTemplate() {
    return createNoEventTemplate();
  }
}
