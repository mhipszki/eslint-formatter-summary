import { test, expect, describe } from 'vitest';
import {
  aggregate,
  extractMessages,
  findRule,
  processMessage,
} from './aggregator';
import { mockLintMessage, mockLintResult } from './mock-result-factory';
import { Rule } from './length-of-longest';

describe('aggregate', () => {
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
});

describe('extractMessages', () => {
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
});

describe('processMessage', () => {
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
    expect(
      processMessage(summary, mockLintMessage(['rule', 1])),
    ).toContainEqual({
      ruleId: 'rule',
      errors: 0,
      warnings: 2,
    });
    expect(
      processMessage(summary, mockLintMessage(['rule', 2])),
    ).toContainEqual({
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
});

describe('findRule', () => {
  test('returns a rule if already included in summary', () => {
    const summary: Rule[] = [
      { ruleId: 'existing rule', errors: 1, warnings: 0 },
    ];
    expect(findRule(summary, 'existing rule')).toEqual<Rule>({
      ruleId: 'existing rule',
      errors: 1,
      warnings: 0,
    });
    expect(findRule(summary, 'non-existing rule')).toBeUndefined();
  });
});
