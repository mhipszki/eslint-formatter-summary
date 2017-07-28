import pad from '../pad-num';

test('returns number as string padded left to given length', () => {
  expect(pad(1234, 5)).toBe(' 1234');
});
