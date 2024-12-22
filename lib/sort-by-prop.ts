import { Rule } from './aggregator';

export const sortBy = (
  prop: keyof Rule,
  items: Rule[],
  direction: 'asc' | 'desc',
) => {
  items.sort((a, b) => {
    if (a[prop] < b[prop]) {
      return direction === 'asc' ? -1 : 1;
    }
    if (a[prop] > b[prop]) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};
