import {Cities, OfferList, TransferList, ActivityList} from '../const.js';
import {getRandomInteger, getRandomArrayItem, getRandomDate, cloneArray} from '../utils.js';


const generateDescription = () => {
  const DescriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const DESCRIPTION_MIN_COUNT = 1;
  const DESCRIPTION_MAX_COUNT = 3;

  const regexp = new RegExp(`\\.\\s`);
  const randomStringList = DescriptionText.split(regexp).sort(() => Math.random() - 0.5);
  const randomCount = getRandomInteger(DESCRIPTION_MIN_COUNT, DESCRIPTION_MAX_COUNT);

  return new Array(randomCount)
  .fill(``)
  .map(()=> getRandomArrayItem(randomStringList))
  .join(` `);
};


const generatePhotos = () => {
  const PHOTO_MIN_COUNT = 3;
  const PHOTO_MAX_COUNT = 6;

  return new Array(getRandomInteger(PHOTO_MIN_COUNT, PHOTO_MAX_COUNT))
  .fill(``)
  .map(() => `http://picsum.photos/300/150?r=${Math.random()}`);
};


const generatePriceElements = (array) => {
  const PRICE_MIN = 5;
  const PRICE_MAX = 1000;

  const newArray = [];

  array.forEach((obj) => {
    obj.price = getRandomInteger(PRICE_MIN, PRICE_MAX);
    newArray.push(obj);
  });
  return newArray;
};

const generateActiveElements = (array, count) => {
  const newArray = [];

  const lastIteration = array.length - count;
  let offerCount = count;

  array.forEach((obj, index) =>{
    const active = Math.random() > 0.7;
    if (active && offerCount > 0 || lastIteration === index && offerCount > 0) {
      obj.checked = true;
      offerCount = offerCount - 1;
    } else {
      obj.checked = false;
    }
    newArray.push(obj);
  });
  return newArray;
};


const сalculationСostEvent = (offers, events) => {
  let cost = events.filter((it) => it.checked)[0].price;

  for (const iterator of offers) {
    if (iterator.checked) {
      cost = cost + iterator.price;
    }
  }

  return cost;
};


const groupEvent = (array, group) => {
  const newArray = [];

  array.forEach((obj) =>{
    obj.group = group;
    newArray.push(obj);
  });
  return newArray;
};


const generateEvent = () => {
  const transfer = groupEvent(cloneArray(TransferList), `transfer`);
  const activities = groupEvent(cloneArray(ActivityList), `activity`);

  const sourceEventList = transfer.concat(activities);
  const currentOfferList = cloneArray(OfferList);
  const currentCityList = cloneArray(Cities);

  const OFFER_MIN_COUNT = 0;
  const OFFER_MAX_COUNT = 2;

  const eventList = generateActiveElements(generatePriceElements(sourceEventList), 1);
  const activeOfferList = generateActiveElements(generatePriceElements(currentOfferList), getRandomInteger(OFFER_MIN_COUNT, OFFER_MAX_COUNT));

  const cityList = generateActiveElements(currentCityList, 1);
  const costEvent = сalculationСostEvent(activeOfferList, eventList);

  return {
    eventList,
    isFavorite: Math.random() > 0.5,
    locationList: cityList,
    dateStart: getRandomDate(7),
    dateEnd: getRandomDate(30),
    price: costEvent,
    offerList: activeOfferList,
    description: generateDescription(),
    photos: generatePhotos(),
  };
};


const generateEvents = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateEvent);
};

export {generateEvent, generateEvents};
