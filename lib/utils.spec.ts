import { test, expect } from 'vitest';
import { lengthOfLongest, padNumber, sortBy, sum } from './utils';
import { Rule } from './aggregator';

test('lengthOfLongest() returns length of specific prop in a set of objects', () => {
  expect(
    lengthOfLongest('ruleId', [
      { ruleId: 'no-console', errors: 0, warnings: 1 },
      { ruleId: 'no-undefined', errors: 0, warnings: 1 },
      { ruleId: 'semi', errors: 0, warnings: 1 },
    ]),
  ).toBe('no-undefined'.length);
});

test('padNumber() returns number as string padded left to given length', () => {
  expect(padNumber(1234, 5)).toBe(' 1234');
});

test('sum() sums up a specific prop value of a set of objects', () => {
  expect(
    sum('errors', [
      { ruleId: 'a', errors: 1, warnings: 0 },
      { ruleId: 'b', errors: 2, warnings: 0 },
      { ruleId: 'c', errors: 3, warnings: 0 },
    ]),
  ).toBe(6);
});

test('sortBy() sorts array by given property and direction', () => {
  const createSummary = (): Rule[] => [
    { ruleId: 'c', errors: 3, warnings: 0 },
    { ruleId: 'b', errors: 2, warnings: 0 },
    { ruleId: 'a', errors: 1, warnings: 0 },
  ];

  const summary1 = createSummary();

  sortBy('ruleId', summary1, 'asc');

  expect(summary1).toEqual<Rule[]>([
    { ruleId: 'a', errors: 1, warnings: 0 },
    { ruleId: 'b', errors: 2, warnings: 0 },
    { ruleId: 'c', errors: 3, warnings: 0 },
  ]);

  const summary2 = createSummary();

  sortBy('ruleId', summary2, 'desc');

  expect(summary2).toEqual<Rule[]>([
    { ruleId: 'c', errors: 3, warnings: 0 },
    { ruleId: 'b', errors: 2, warnings: 0 },
    { ruleId: 'a', errors: 1, warnings: 0 },
  ]);
});
