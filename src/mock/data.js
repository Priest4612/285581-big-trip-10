import {generatePoints} from './point-mock.js';

const POINT_COUNT = Math.random() > 0.8 ? 0 : 20;

const data = generatePoints(POINT_COUNT);

export {data};
