import {generateEvents} from './event-mock.js';

const EVENT_COUNT = 4;
let data = [];

data = generateEvents(EVENT_COUNT);

export {data};
