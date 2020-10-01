import findRule from '../find-rule';

test('returns a rule if already included in summary', () => {
  const summary = [{ ruleId: 'existing rule' }];
  expect(findRule(summary, 'existing rule')).toEqual({
    ruleId: 'existing rule',
  });
  expect(findRule(summary, 'non-existing rule')).toBeUndefined();
});
