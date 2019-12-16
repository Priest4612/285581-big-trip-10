import {generateEvents} from './event-mock.js';

const EVENT_COUNT = Math.random() > 0.9 ? 0 : 20;

const data = generateEvents(EVENT_COUNT);

export {data};
