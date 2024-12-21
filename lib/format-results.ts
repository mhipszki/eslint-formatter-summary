import chalk from 'chalk-template';
import { ESLint } from 'eslint';

import { padNumber } from './pad-num';
import { sum } from './sum-up';
import { lengthOfLongest, Rule } from './length-of-longest';
import { sortBy } from './sort-by-prop';
import { aggregate } from './aggregator';

const maxErrorLen = (rules: Rule[]) => lengthOfLongest('errors', rules);
const maxWarningLen = (rules: Rule[]) => lengthOfLongest('warnings', rules);
const maxRuleLen = (rules: Rule[]) => lengthOfLongest('ruleId', rules);

const totalErrors = (rules: Rule[]) => sum('errors', rules);
const totalWarnings = (rules: Rule[]) => sum('warnings', rules);
const totalProblems = (rules: Rule[]) =>
  totalErrors(rules) + totalWarnings(rules);

const sparkles = String.fromCodePoint(0x2728);
const flames = String.fromCodePoint(0x1f525);

const constructHeader = (rules: Rule[]) => {
  const errors = '0'.repeat(maxErrorLen(rules));
  const warnings = '0'.repeat(maxWarningLen(rules));
  const longestRule = '0'.repeat(maxRuleLen(rules));
  const len = `errors ${errors} warnings ${warnings} rule: ${longestRule}`
    .length;
  const header = ` ${sparkles}  Summary of failing ESLint rules `.padEnd(len);
  return chalk`{bgBlue ${header}}`;
};

const constructSummary = (rules: Rule[]) =>
  rules
    .map((rule, i) => {
      const errors = padNumber(rule.errors, maxErrorLen(rules));
      const warnings = padNumber(rule.warnings, maxWarningLen(rules));
      const { ruleId } = rule;
      const line = chalk`errors {red ${errors}} warnings {yellow ${warnings}} rule: {gray ${ruleId}}`;
      return i < rules.length - 1 ? `${line}\n` : line;
    })
    .join('');

const constructTotal = (rules: Rule[]) =>
  chalk`${flames}  {red ${totalProblems(
    rules,
  )} problems in total} (${totalErrors(rules)} {red errors}, ${totalWarnings(
    rules,
  )} {yellow warnings})`;

type EnvVars = {
  SORT_BY?: 'rule' | 'errors' | 'warnings';
  DESC?: 'true';
};

/**
 * Generates formatted summary output from ESLint result set
 *
 * Accepts the following options:
 * `process.env.SORT_BY <prop>` where <prop> can be `rule`, `errors`, `warnings`
 * `process.env.DESC` to reverse order of sorted rule summary
 *
 * @param   {Array} results       ESLint results
 * @param   {Array} env           Node's process.env
 * @returns {string}              The formatted output
 */
export default function format(
  results: ESLint.LintResult[],
  { SORT_BY = 'rule', DESC }: EnvVars,
): string {
  const rules = aggregate(results);

  if (['rule', 'errors', 'warnings'].includes(SORT_BY)) {
    const prop = SORT_BY === 'rule' ? 'ruleId' : SORT_BY;
    const direction = DESC === 'true' ? 'desc' : 'asc';
    sortBy(prop, rules, direction);
  } else {
    // default sorting is by rule / ascending
    sortBy('ruleId', rules, 'asc');
  }

  const header = constructHeader(rules);
  const summary = constructSummary(rules);
  const total = constructTotal(rules);

  return `${header}\n${summary}\n${total}`;
}
