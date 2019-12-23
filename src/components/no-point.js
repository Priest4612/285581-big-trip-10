import AbstractComponent from "./abstract-component";

const createNoPointTemplate = () => {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
};

export default class NoPointComponent extends AbstractComponent {
  getTemplate() {
    return createNoPointTemplate();
  }
}
