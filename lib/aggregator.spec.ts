import { test, expect } from 'vitest';
import { aggregate } from './aggregator';
import { mockLintResult } from './mock-result-factory';

test('aggregates errors and warnings by rule', () => {
  const results = [
    mockLintResult([
      ['rule1', 1],
      ['rule2', 1],
    ]),
    mockLintResult([
      ['rule2', 1],
      ['rule3', 2],
    ]),
    mockLintResult([
      ['rule3', 2],
      ['rule4', 2],
      ['rule5', 2],
    ]),
  ];

  expect(aggregate(results)).toEqual([
    { ruleId: 'rule1', errors: 0, warnings: 1 },
    { ruleId: 'rule2', errors: 0, warnings: 2 },
    { ruleId: 'rule3', errors: 2, warnings: 0 },
    { ruleId: 'rule4', errors: 1, warnings: 0 },
    { ruleId: 'rule5', errors: 1, warnings: 0 },
  ]);
});
