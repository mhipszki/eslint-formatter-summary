import chalk from 'chalk-template';
import { ESLint } from 'eslint';

import { Rule, aggregate } from './aggregator';
import { lengthOfLongest, padNumber, sortBy, sum } from './utils';

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

const constructJsonSummary = (rules: Rule[]) =>
  rules.reduce<Record<string, { errors: number; warnings: number }>>(
    (acc, rule) => {
      acc[rule.ruleId] = { errors: rule.errors, warnings: rule.warnings };
      return acc;
    },
    {},
  );

const constructTotal = (rules: Rule[]) =>
  chalk`${flames}  {red ${totalProblems(
    rules,
  )} problems in total} (${totalErrors(rules)} {red errors}, ${totalWarnings(
    rules,
  )} {yellow warnings})`;

const constructJsonTotal = (rules: Rule[]) => {
  return {
    total: {
      errors: totalErrors(rules),
      warnings: totalWarnings(rules),
      problems: totalProblems(rules),
    },
  };
};

type EnvVars = {
  SORT_BY?: 'rule' | 'errors' | 'warnings';
  DESC?: 'true';
  FORMAT?: 'json' | 'text';
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
  { SORT_BY = 'rule', DESC, FORMAT = 'text' }: EnvVars,
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

  if (FORMAT === 'json') {
    const summary = constructJsonSummary(rules);
    const total = constructJsonTotal(rules);
    return JSON.stringify({ summary, total }, null, 2);
  }

  const header = constructHeader(rules);
  const summary = constructSummary(rules);
  const total = constructTotal(rules);

  return `${header}\n${summary}\n${total}`;
}
