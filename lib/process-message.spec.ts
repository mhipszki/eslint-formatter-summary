import { test, expect } from 'vitest';
import { processMessage } from './process-message';
import { Rule } from './length-of-longest';
import { mockLintMessage } from './mock-result-factory';

test('adds new rules to summary', () => {
  const summary: Rule[] = [];
  expect(
    processMessage(summary, mockLintMessage(['new rule', 1])),
  ).toContainEqual({
    ruleId: 'new rule',
    errors: 0,
    warnings: 1,
  });
  expect(
    processMessage(summary, mockLintMessage(['another rule', 2])),
  ).toContainEqual({
    ruleId: 'another rule',
    errors: 1,
    warnings: 0,
  });
});

// test('skips rules with no ruleId', () => {
//   const summary: Rule[] = [];
//   expect(processMessage(summary, mockLintMessage([undefined, 1]))).toEqual([]);
// });

test('updates errors / warnings of existing rules', () => {
  const summary = processMessage([], mockLintMessage(['rule', 1]));
  expect(processMessage(summary, mockLintMessage(['rule', 1]))).toContainEqual({
    ruleId: 'rule',
    errors: 0,
    warnings: 2,
  });
  expect(processMessage(summary, mockLintMessage(['rule', 2]))).toContainEqual({
    ruleId: 'rule',
    errors: 1,
    warnings: 2,
  });
});

// test('maps ruleId=null to `syntax error`', () => {
//   expect(processMessage([], mockLintMessage([null, 2]))).toContainEqual({
//     ruleId: 'syntax error',
//     errors: 1,
//     warnings: 0,
//   });
// });
