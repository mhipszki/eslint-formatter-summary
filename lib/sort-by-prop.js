/**
 * @param {string} prop
 * @param {Array<Record<string, any> >} array
 * @param {'asc'|'desc'} direction
 * @returns {void}
 */
 const sortBy = (prop, array, direction) => {
  array.sort((a, b) => {
    if (a[prop] < b[prop]) {
      return direction === 'asc' ? -1 : 1;
    }
    if (a[prop] > b[prop]) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

export default sortBy;
