import lengthOfLongest from '../length-of-longest';

test('returns length of specific prop in a set of objects', () => {
  expect(lengthOfLongest('value', [
    { value: '123' },
    { value: 1234 },
    { value: 'asdfasdf' }
  ])).toBe(8);
});
