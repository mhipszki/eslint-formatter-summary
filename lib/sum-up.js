/**
 * @template {string} T
 * @param {T} prop
 * @param {Array<Record<T, number>>} array
 * @returns {number}
 */
const sum = (prop, array) => array.reduce((count, obj) => count + obj[prop], 0);

export default sum;
