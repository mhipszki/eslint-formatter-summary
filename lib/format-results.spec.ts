import { test, expect, describe } from 'vitest';
import stripAnsi from 'strip-ansi';
import { format } from './format-results';
import { mockLintResult } from './mock-result-factory';

describe('formatResults', () => {
  test('provides header, summary of rules and total', () => {
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
    const output = stripAnsi(format(results, {}));
    expect(output).toMatchSnapshot();
  });

  test('defaults to sorting summary by rule id / ascending', () => {
    const results = [
      mockLintResult([
        ['B', 1],
        ['C', 2],
        ['A', 2],
      ]),
      mockLintResult([
        ['A', 1],
        ['C', 1],
      ]),
    ];
    expect(stripAnsi(format(results, {}))).toMatchSnapshot();
  });

  test('can sort summary by rule id', () => {
    const results = [
      mockLintResult([
        ['rule2', 1],
        ['rule3', 2],
      ]),
      mockLintResult([
        ['rule1', 1],
        ['rule2', 1],
      ]),
    ];
    expect(stripAnsi(format(results, { SORT_BY: 'rule' }))).toMatchSnapshot();
    expect(
      stripAnsi(format(results, { SORT_BY: 'rule', DESC: 'true' })),
    ).toMatchSnapshot();
  });

  test('can sort summary by num of errors', () => {
    const results = [
      mockLintResult([
        ['rule2', 2],
        ['rule3', 2],
      ]),
      mockLintResult([
        ['rule1', 1],
        ['rule2', 2],
      ]),
    ];
    expect(stripAnsi(format(results, { SORT_BY: 'errors' }))).toMatchSnapshot();
    expect(
      stripAnsi(format(results, { SORT_BY: 'errors', DESC: 'true' })),
    ).toMatchSnapshot();
  });

  test('can sort summary by num of warnings', () => {
    const results = [
      mockLintResult([
        ['rule2', 1],
        ['rule3', 2],
      ]),
      mockLintResult([
        ['rule1', 1],
        ['rule2', 1],
      ]),
    ];
    expect(
      stripAnsi(format(results, { SORT_BY: 'warnings' })),
    ).toMatchSnapshot();
    expect(
      stripAnsi(format(results, { SORT_BY: 'warnings', DESC: 'true' })),
    ).toMatchSnapshot();
  });

  test('can output summary in json format', () => {
    const results = [
      mockLintResult([
        ['rule1', 1],
        ['rule2', 2],
      ]),
    ];
    const output = JSON.parse(format(results, { FORMAT: 'json' }));

    expect(output).toEqual({
      summary: {
        rule1: {
          errors: 0,
          warnings: 1,
        },
        rule2: {
          errors: 1,
          warnings: 0,
        },
      },
      total: {
        errors: 1,
        warnings: 1,
        problems: 2,
      },
    });
  });

  // test('omits result for ignored files', () => {
  //   const ignoredFileResults: ESLint.LintResult = {
  //     filePath: 'test.js',
  //     messages: [
  //       {
  //         ruleId: undefined,
  //         column: 1,
  //         line: 1,
  //         severity: 1,
  //         message:
  //           'File ignored because of a matching ignore pattern. Use "--no-ignore" to override.',
  //       },
  //     ],
  //     suppressedMessages: [],
  //     errorCount: 0,
  //     fatalErrorCount: 0,
  //     warningCount: 1,
  //     fixableErrorCount: 0,
  //     fixableWarningCount: 0,
  //     usedDeprecatedRules: [],
  //   };

  //   expect(
  //     stripAnsi(
  //       format(
  //         [
  //           mockLintResult([
  //             ['rule1', 1],
  //             ['rule2', 2],
  //           ]),
  //           ignoredFileResults,
  //         ],
  //         {},
  //       ),
  //     ),
  //   ).toMatchSnapshot();

  //   expect(stripAnsi(format([ignoredFileResults], {}))).toMatchSnapshot();
  // });
});
