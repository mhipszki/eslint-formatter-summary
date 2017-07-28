import sortBy from '../sort-by-prop';

test('sorts array by given property and direction', () => {
  const createArray = (...values) => values.map(
    value => ({ value })
  );

  let array = createArray('b', 'a');
  sortBy('value', array, 'asc');
  expect(array).toEqual([
    { value: 'a' },
    { value: 'b' }
  ]);

  array = createArray('a', 'b', 'c');
  sortBy('value', array, 'desc');
  expect(array).toEqual([
    { value: 'c' },
    { value: 'b' },
    { value: 'a' }
  ]);
});
