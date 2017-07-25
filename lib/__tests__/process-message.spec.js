const processMessage = require('../process-message');

test('adds new rules to summary', () => {
  const summary = [];
  expect(processMessage(summary, { ruleId: 'new rule', severity: 1 })).toContainEqual({
    ruleId: 'new rule', errors: 0, warnings: 1
  });
  expect(processMessage(summary, { ruleId: 'another rule', severity: 2 })).toContainEqual({
    ruleId: 'another rule', errors: 1, warnings: 0
  });
});

test('updates errors / warnings of existing rules', () => {
  const summary = processMessage([], { ruleId: 'rule', severity: 1 });
  expect(processMessage(summary, { ruleId: 'rule', severity: 1 })).toContainEqual({
    ruleId: 'rule', errors: 0, warnings: 2
  });
  expect(processMessage(summary, { ruleId: 'rule', severity: 2 })).toContainEqual({
    ruleId: 'rule', errors: 1, warnings: 2
  });
});
