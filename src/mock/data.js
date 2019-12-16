import {generateEvents} from './event-mock.js';

const EVENT_COUNT = Math.random() > 0.9 ? 0 : 20;

const data = generateEvents(EVENT_COUNT);

// data.forEach((item) => console.log(`start: ${item.dateStart}, end ${item.dateEnd}`));

export {data};
