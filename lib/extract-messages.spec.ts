import { test, expect } from 'vitest';
import { extractMessages } from './extract-messages';
import { mockLintResult } from './mock-result-factory';

test('returns a flat array of messages of ESLint result objects', () => {
  const results = [
    mockLintResult([['rule1', 1]]),
    mockLintResult([
      ['rule2', 1],
      ['rule3', 2],
    ]),
  ];
  const messages = extractMessages(results);
  expect(messages).toEqual([
    {
      column: 1,
      line: 1,
      message: "'rule1' has failed",
      nodeType: 'Identifier',
      ruleId: 'rule1',
      severity: 1,
    },
    {
      column: 1,
      line: 1,
      message: "'rule2' has failed",
      nodeType: 'Identifier',
      ruleId: 'rule2',
      severity: 1,
    },
    {
      column: 1,
      line: 1,
      message: "'rule3' has failed",
      nodeType: 'Identifier',
      ruleId: 'rule3',
      severity: 2,
    },
  ]);
});
