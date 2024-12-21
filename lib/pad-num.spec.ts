import { test, expect } from 'vitest';
import { padNumber } from './pad-num';

test('returns number as string padded left to given length', () => {
  expect(padNumber(1234, 5)).toBe(' 1234');
});
