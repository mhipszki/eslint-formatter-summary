/**
 * @template {string} T
 * @param {T} prop
 * @param {Array<Record<T, number|string>>} array
 * @returns {number}
 */
 const lengthOfLongest = (prop, array) =>
  array.reduce(
    (length, obj) =>
      typeof obj[prop] !== 'undefined'
        ? Math.max(length, obj[prop].toString().length)
        : length,
    0
  );

export default lengthOfLongest;
