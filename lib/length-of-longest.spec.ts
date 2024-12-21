import { test, expect } from 'vitest';
import { lengthOfLongest } from './length-of-longest';

test('returns length of specific prop in a set of objects', () => {
  expect(
    lengthOfLongest('ruleId', [
      { ruleId: 'no-console', errors: 0, warnings: 1 },
      { ruleId: 'no-undefined', errors: 0, warnings: 1 },
      { ruleId: 'semi', errors: 0, warnings: 1 },
    ]),
  ).toBe('no-undefined'.length);

  expect(
    lengthOfLongest('errors', [{ ruleId: undefined, errors: 0, warnings: 1 }]),
  ).toBe(1);

  expect(
    lengthOfLongest('warnings', [
      { ruleId: undefined, errors: 0, warnings: 1 },
    ]),
  ).toBe(1);

  expect(
    lengthOfLongest('ruleId', [{ ruleId: undefined, errors: 0, warnings: 1 }]),
  ).toBe(0);
});
