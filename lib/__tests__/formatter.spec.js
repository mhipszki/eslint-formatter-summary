import { format } from '../formatter';
import mockResult from './mock-result-factory';

jest.unmock('yargs');

test('provides header, summary of rules and total', () => {
  const results = [
    mockResult([[ 'rule1', 1 ], [ 'rule2', 1 ]]),
    mockResult([[ 'rule2', 1 ], [ 'rule3', 2 ]]),
    mockResult([[ 'rule3', 2 ], [ 'rule4', 2 ], [ 'rule5', 2 ]])
  ];
  const argv = [];
  expect(format(results, argv)).toMatchSnapshot();
});

test('can sort summary by rule id ascending', () => {
  const results = [
    mockResult([[ 'rule2', 1 ], [ 'rule3', 2 ]]),
    mockResult([[ 'rule1', 1 ], [ 'rule2', 1 ]])
  ];
  const argv = [
    'eslint',
    '-f',
    './index.js',
    '.',
    '--',
    '--sort-by',
    'rule'
  ];
  expect(format(results, argv)).toMatchSnapshot();
});

test('can sort summary by rule id descending', () => {
  const results = [
    mockResult([[ 'rule2', 1 ], [ 'rule3', 2 ]]),
    mockResult([[ 'rule1', 1 ], [ 'rule2', 1 ]])
  ];
  const argv = [
    'eslint',
    '-f',
    './index.js',
    '.',
    '--',
    '--sort-by',
    'rule',
    '--desc'
  ];
  expect(format(results, argv)).toMatchSnapshot();
});

test('can sort summary by num of errors ascending', () => {
  const results = [
    mockResult([[ 'rule2', 2 ], [ 'rule3', 2 ]]),
    mockResult([[ 'rule1', 1 ], [ 'rule2', 2 ]])
  ];
  const argv = [
    'eslint',
    '-f',
    './index.js',
    '.',
    '--',
    '--sort-by',
    'errors'
  ];
  expect(format(results, argv)).toMatchSnapshot();
});

test('can sort summary by num of errors descending', () => {
  const results = [
    mockResult([[ 'rule2', 2 ], [ 'rule3', 2 ]]),
    mockResult([[ 'rule1', 1 ], [ 'rule2', 2 ]])
  ];
  const argv = [
    'eslint',
    '-f',
    './index.js',
    '.',
    '--',
    '--sort-by',
    'errors',
    '--desc'
  ];
  expect(format(results, argv)).toMatchSnapshot();
});
