import sum from '../sum-up';

test('sums up a specific prop value of a set of objects', () => {
  expect(sum('value', [
    { value: 1 },
    { value: 2 },
    { value: 3 }
  ])).toBe(6);
});
