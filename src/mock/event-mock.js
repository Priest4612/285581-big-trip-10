import {Cities, OfferList, TransferList, ActivityList} from '../const.js';
import {getRandomInteger, getRandomArrayItem, getRandomDate} from '../utils.js';

const eventTypes = TransferList.concat(ActivityList);

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


const generatePrice = () => {
  const PRICE_MIN = 5;
  const PRICE_MAX = 1000;

  return getRandomInteger(PRICE_MIN, PRICE_MAX);
};


const generateOfferList = (array) => {

  const offers = new Array(0);
  array.map((obj) =>{
    obj.price = generatePrice();
    obj.checked = Math.random() > 0.5;

    offers.push(obj);
  });

  return offers;
};


const generateOffers = (array) => {
  const OFFERS_MIN_COUNT = 0;
  const OFFERS_MAX_COUNT = 2;
  const OFFERS_AVAILABLE_COUNT = 5;
  const offerList = generateOfferList(array);

  const createArrayList = (offers, count) => {
    return new Array(count)
    .fill(``)
    .map(() => {
      return getRandomArrayItem(offers);
    });
  };

  const title = createArrayList(offerList, getRandomInteger(OFFERS_MIN_COUNT, OFFERS_MAX_COUNT));
  const available = createArrayList(offerList, OFFERS_AVAILABLE_COUNT);

  return (
    {
      offersTitle: title,
      offersAvailable: available,
    }
  );
};


const generateEvent = () => {
  const startEvent = getRandomDate(7);
  const endEvent = getRandomDate(30);

  const getDurationEvent = (start, end) => {
    const duration = new Date(end - start);
    const day = duration.getDay();
    const hours = duration.getHours();
    const minutes = duration.getMinutes();

    return `${day > 0 ? day + `D ` : ``}${hours}H ${minutes}M`;
  };

  return {
    type: getRandomArrayItem(eventTypes),
    isFavorite: Math.random() > 0.5,
    city: getRandomArrayItem(Cities),
    dateStart: startEvent,
    dateEnd: endEvent,
    duration: getDurationEvent(),
    price: generatePrice(),
    offersTitle: generateOffers(OfferList).offersTitle,
    offersAvailable: generateOffers(OfferList).offersAvailable,
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
