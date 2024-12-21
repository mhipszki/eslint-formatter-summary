import { test, expect } from 'vitest';
import { findRule } from './find-rule';
import { Rule } from './length-of-longest';

test('returns a rule if already included in summary', () => {
  const summary: Rule[] = [{ ruleId: 'existing rule', errors: 1, warnings: 0 }];
  expect(findRule(summary, 'existing rule')).toEqual<Rule>({
    ruleId: 'existing rule',
    errors: 1,
    warnings: 0,
  });
  expect(findRule(summary, 'non-existing rule')).toBeUndefined();
});
