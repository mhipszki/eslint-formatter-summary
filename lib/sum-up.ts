import { Rule } from './length-of-longest';

export const sum = (prop: 'errors' | 'warnings', array: Rule[]) =>
  array.reduce((count, obj) => count + obj[prop], 0);
