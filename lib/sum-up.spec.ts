import { test, expect } from 'vitest';
import { sum } from './sum-up';

test('sums up a specific prop value of a set of objects', () => {
  expect(
    sum('errors', [
      { ruleId: 'a', errors: 1, warnings: 0 },
      { ruleId: 'b', errors: 2, warnings: 0 },
      { ruleId: 'c', errors: 3, warnings: 0 },
    ]),
  ).toBe(6);
});
