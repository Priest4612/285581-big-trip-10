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
  const offerList = new Array(0);
  array.map((obj) =>{
    obj.price = generatePrice();
    obj.checked = Math.random() > 0.5;

    offerList.push(obj);
  });

  return offerList;
};


const generateEvent = () => {
  return {
    type: getRandomArrayItem(eventTypes).title,
    isFavorite: Math.random() > 0.5,
    location: getRandomArrayItem(Cities).location,
    dateStart: getRandomDate(7),
    dateEnd: getRandomDate(30),
    price: generatePrice(),
    offerList: generateOfferList(OfferList),
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
