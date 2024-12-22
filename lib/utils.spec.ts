import { test, expect, describe } from 'vitest';
import { lengthOfLongest, padNumber } from './utils';

describe('lengthOfLongest', () => {
  test('returns length of specific prop in a set of objects', () => {
    expect(
      lengthOfLongest('ruleId', [
        { ruleId: 'no-console', errors: 0, warnings: 1 },
        { ruleId: 'no-undefined', errors: 0, warnings: 1 },
        { ruleId: 'semi', errors: 0, warnings: 1 },
      ]),
    ).toBe('no-undefined'.length);
  });
});

describe('padNumber', () => {
  test('returns number as string padded left to given length', () => {
    expect(padNumber(1234, 5)).toBe(' 1234');
  });
});
