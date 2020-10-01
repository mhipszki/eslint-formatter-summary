import sortBy from '../sort-by-prop';

test('sorts array by given property and direction', () => {
  const createArray = (...values) => values.map((value) => ({ value }));

  let array = createArray('c', 'b', 'a', 'b');
  sortBy('value', array, 'asc');
  expect(array).toEqual([
    { value: 'a' },
    { value: 'b' },
    { value: 'b' },
    { value: 'c' },
  ]);

  array = createArray('a', 'c', 'b');
  sortBy('value', array, 'desc');
  expect(array).toEqual([{ value: 'c' }, { value: 'b' }, { value: 'a' }]);
});
