import stripAnsi from 'strip-ansi';
import format from '../format-results';
import mockResult from './mock-result-factory';

jest.unmock('yargs');

const argv = (prop = '', direction = '') => [
  'eslint',
  '-f',
  './index.js',
  '.',
  '--',
  '--sort-by',
  `${prop}`,
  direction === 'desc' ? '--desc' : '--asc',
];

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
  expect(stripAnsi(format(results, argv()))).toMatchSnapshot();
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
  expect(stripAnsi(format(results, argv('rule')))).toMatchSnapshot();
  expect(stripAnsi(format(results, argv('rule', 'desc')))).toMatchSnapshot();
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
  expect(stripAnsi(format(results, argv('errors')))).toMatchSnapshot();
  expect(stripAnsi(format(results, argv('errors', 'desc')))).toMatchSnapshot();
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
  expect(stripAnsi(format(results, argv('warnings')))).toMatchSnapshot();
  expect(
    stripAnsi(format(results, argv('warnings', 'desc')))
  ).toMatchSnapshot();
});
