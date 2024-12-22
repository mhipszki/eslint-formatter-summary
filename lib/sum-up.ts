import { Rule } from './aggregator';

export const sum = (prop: 'errors' | 'warnings', array: Rule[]) =>
  array.reduce((count, obj) => count + obj[prop], 0);
