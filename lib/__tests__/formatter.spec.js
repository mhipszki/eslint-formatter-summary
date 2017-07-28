import { format } from '../formatter';
import mockResult from './mock-result-factory';

test('provides header, summary of rules and total', () => {
  const results = [
    mockResult([[ 'rule1', 1 ], [ 'rule2', 1 ]]),
    mockResult([[ 'rule2', 1 ], [ 'rule3', 2 ]]),
    mockResult([[ 'rule3', 2 ], [ 'rule4', 2 ], [ 'rule5', 2 ]])
  ];
  expect(format(results)).toMatchSnapshot();
});
