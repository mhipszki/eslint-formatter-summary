import { Rule } from './length-of-longest';

export const findRule = (summary: Rule[], ruleId: string) =>
  summary.find((rule) => ruleId === rule.ruleId);
