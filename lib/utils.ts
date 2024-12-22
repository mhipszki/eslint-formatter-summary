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
