
const isObject = (object) => {
  const type = typeof object;
  return type === `function` || type === `object`;
};


const cloneObject = (source) => {
  const clone = {};

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (isObject(source[key])) {
        clone[key] = cloneObject(source[key]);
      } else {
        clone[key] = source[key];
      }
    }
  }
  return clone;
};


export const cloneArray = (source) => {
  const clone = [];

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (isObject(source[key])) {
        clone[key] = cloneObject(source[key]);
      } else {
        clone[key] = source[key];
      }
    }
  }
  return clone;
};
