import stripAnsi from 'strip-ansi';
import format from '../format-results';
import mockResult from './mock-result-factory';

test('provides header, summary of rules and total', () => {
  const results = [
    mockResult([
      ['rule1', 1],
      ['rule2', 1],
    ]),
    mockResult([
      ['rule2', 1],
      ['rule3', 2],
    ]),
    mockResult([
      ['rule3', 2],
      ['rule4', 2],
      ['rule5', 2],
    ]),
  ];
  expect(stripAnsi(format(results, {}))).toMatchSnapshot();
});

test('can sort summary by rule id', () => {
  const results = [
    mockResult([
      ['rule2', 1],
      ['rule3', 2],
    ]),
    mockResult([
      ['rule1', 1],
      ['rule2', 1],
    ]),
  ];
  expect(stripAnsi(format(results, { SORT_BY: 'rule' }))).toMatchSnapshot();
  expect(
    stripAnsi(format(results, { SORT_BY: 'rule', DESC: 'true' }))
  ).toMatchSnapshot();
});

test('can sort summary by num of errors', () => {
  const results = [
    mockResult([
      ['rule2', 2],
      ['rule3', 2],
    ]),
    mockResult([
      ['rule1', 1],
      ['rule2', 2],
    ]),
  ];
  expect(stripAnsi(format(results, { SORT_BY: 'errors' }))).toMatchSnapshot();
  expect(
    stripAnsi(format(results, { SORT_BY: 'errors', DESC: 'true' }))
  ).toMatchSnapshot();
});

test('can sort summary by num of warnings', () => {
  const results = [
    mockResult([
      ['rule2', 1],
      ['rule3', 2],
    ]),
    mockResult([
      ['rule1', 1],
      ['rule2', 1],
    ]),
  ];
  expect(stripAnsi(format(results, { SORT_BY: 'warnings' }))).toMatchSnapshot();
  expect(
    stripAnsi(format(results, { SORT_BY: 'warnings', DESC: 'true' }))
  ).toMatchSnapshot();
});

test('omits result for ignored files', () => {
  const ignoredFileResults = {
    filePath: 'test.js',
    messages: [
      {
        fatal: false,
        severity: 1,
        message:
          'File ignored because of a matching ignore pattern. Use "--no-ignore" to override.',
      },
    ],
    errorCount: 0,
    warningCount: 1,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    usedDeprecatedRules: [],
  };

  expect(
    stripAnsi(
      format(
        [
          mockResult([
            ['rule1', 1],
            ['rule2', 2],
          ]),
          ignoredFileResults,
        ],
        {}
      )
    )
  ).toMatchSnapshot();

  expect(stripAnsi(format([ignoredFileResults], {}))).toMatchSnapshot();
});
