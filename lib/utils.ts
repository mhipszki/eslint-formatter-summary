import { Rule } from './aggregator';

export const lengthOfLongest = (prop: keyof Rule, items: Rule[]) =>
  items.reduce(
    (length, item) =>
      typeof item[prop] !== 'undefined'
        ? Math.max(length, (item[prop] ?? 0).toString().length)
        : length,
    0,
  );

export const padNumber = (num: number, len: number) =>
  num.toString().padStart(len);

export const sum = (prop: 'errors' | 'warnings', array: Rule[]) =>
  array.reduce((count, obj) => count + obj[prop], 0);

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
