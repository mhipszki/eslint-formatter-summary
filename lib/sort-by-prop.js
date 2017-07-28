const sortBy = (prop, array, direction) => {
  array.sort((a, b) => {
    if (a[prop] < b[prop]) {
      return direction === 'asc' ? -1 : 1;
    }
    if (a[prop] > b[prop]) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  })
}

export default sortBy;
