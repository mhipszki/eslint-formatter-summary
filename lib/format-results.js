// @ts-check

import chalk from 'chalk';
import pad from './pad-num.js';
import sum from './sum-up.js';
import lengthOfLongest from './length-of-longest.js';
import sortBy from './sort-by-prop.js';
import aggregate from './aggregator.js';

/** @type {(rules: import('./process-message').MessageSummary[]) => number } */
const maxErrorLen = (rules) => lengthOfLongest('errors', rules);
/** @type {(rules: import('./process-message').MessageSummary[]) => number } */
const maxWarningLen = (rules) => lengthOfLongest('warnings', rules);
/** @type {(rules: import('./process-message').MessageSummary[]) => number } */
const maxRuleLen = (rules) => lengthOfLongest('ruleId', rules);

/** @type {(rules: import('./process-message').MessageSummary[]) => number } */
const totalErrors = (rules) => sum('errors', rules);
/** @type {(rules: import('./process-message').MessageSummary[]) => number } */
const totalWarnings = (rules) => sum('warnings', rules);
/** @type {(rules: import('./process-message').MessageSummary[]) => number } */
const totalProblems = (rules) => totalErrors(rules) + totalWarnings(rules);

const sparkles = String.fromCodePoint(0x2728);
const flames = String.fromCodePoint(0x1f525);

/**
 * @param {import('./process-message').MessageSummary[]} rules
 * @returns {string}
 */
const constructHeader = (rules) => {
  const errors = '0'.repeat(maxErrorLen(rules));
  const warnings = '0'.repeat(maxWarningLen(rules));
  const longestRule = '0'.repeat(maxRuleLen(rules));
  const len = `errors ${errors} warnings ${warnings} rule: ${longestRule}`
    .length;
  const header = ` ${sparkles}  Summary of failing ESLint rules `.padEnd(len);
  return chalk`{bgBlue ${header}}`;
};

/**
 * @param {import('./process-message').MessageSummary[]} rules
 * @returns {string}
 */
const constructSummary = (rules) =>
  rules
    .map((rule, i) => {
      const errors = pad(rule.errors, maxErrorLen(rules));
      const warnings = pad(rule.warnings, maxWarningLen(rules));
      const { ruleId } = rule;
      const line = chalk`errors {red ${errors}} warnings {yellow ${warnings}} rule: {gray ${ruleId}}`;
      return i < rules.length - 1 ? `${line}\n` : line;
    })
    .join('');

/**
 * @param {import('./process-message').MessageSummary[]} rules
 * @returns {string}
 */
const constructTotal = (rules) =>
  chalk`${flames}  {red ${totalProblems(
    rules
  )} problems in total} (${totalErrors(rules)} {red errors}, ${totalWarnings(
    rules
  )} {yellow warnings})`;

/**
 * @typedef FormatOptions
 * @property {string|undefined} sortByProp
 * @property {boolean|undefined} [sortDescending]
 */

/**
 * Generates formatted summary output from ESLint result set
 *
 * @param   {import('eslint').ESLint.LintResult[]} results  ESLint results
 * @param   {FormatOptions}                        options  Options from process.env
 * @returns {string}                                        The formatted output
 */
export function format(results, options) {
  const { sortByProp, sortDescending } = options;
  const rules = aggregate(results);

  if (sortByProp && ['rule', 'errors', 'warnings'].includes(sortByProp)) {
    const prop = sortByProp === 'rule' ? 'ruleId' : sortByProp;
    const direction = sortDescending ? 'desc' : 'asc';
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
