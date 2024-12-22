import { test, expect } from 'vitest';
import { sortBy } from './sort-by-prop';
import { Rule } from './aggregator';

test('sorts array by given property and direction', () => {
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
