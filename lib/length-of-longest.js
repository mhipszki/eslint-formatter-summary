const lengthOfLongest = (prop, array) => array.reduce(
  (length, obj) => Math.max(length, obj[prop].toString().length),
  0
);

export default lengthOfLongest;
