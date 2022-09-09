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

const HEAD_ERROR = 'Errors';
const HEAD_WARNING = 'Warnings';
const HEAD_RULE = 'Rule';

/**
 * @param {import('./process-message').MessageSummary[]} rules
 * @param {{ markdown: boolean }} options
 * @returns {string}
 */
const constructHeader = (rules, { markdown }) => {
  if (markdown) {
    const maxError = Math.max(HEAD_ERROR.length, maxErrorLen(rules));
    const maxWarning = Math.max(HEAD_WARNING.length, maxWarningLen(rules));
    const maxRule = Math.max(HEAD_RULE.length, maxRuleLen(rules));

    return (
      `| ${HEAD_ERROR.padEnd(maxError)} | ${HEAD_WARNING.padEnd(
        maxWarning
      )} | ${HEAD_RULE.padEnd(maxRule)} |\n` +
      `| ${'-'.repeat(maxError)} | ${'-'.repeat(maxWarning)} | ${'-'.repeat(
        maxRule
      )} |`
    );
  }
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
 * @param {{ markdown: boolean, rulesMeta: import('eslint').ESLint.LintResultData["rulesMeta"] }} options
 * @returns {string}
 */
const constructSummary = (rules, { markdown, rulesMeta }) => {
  const maxError = Math.max(
    markdown ? HEAD_ERROR.length : 0,
    maxErrorLen(rules)
  );
  const maxWarning = Math.max(
    markdown ? HEAD_WARNING.length : 0,
    maxWarningLen(rules)
  );
  const maxRule = Math.max(markdown ? HEAD_RULE.length : 0, maxRuleLen(rules));

  return rules
    .map((rule, i) => {
      const errors = pad(rule.errors, maxError);
      const warnings = pad(rule.warnings, maxWarning);
      const { ruleId } = rule;
      const meta = rulesMeta[ruleId] || {};
      const ruleMarkdown = (meta.docs || {}).url
        ? `[${ruleId}](${(meta.docs || {}).url})`
        : ruleId;

      const line = markdown
        ? `| ${errors} | ${warnings} | ${ruleMarkdown.padEnd(maxRule)} |`
        : chalk`errors {red ${errors}} warnings {yellow ${warnings}} rule: {gray ${ruleId}}`;
      return i < rules.length - 1 ? `${line}\n` : line;
    })
    .join('');
};

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
 * @property {string|undefined} output
 * @property {string|undefined} sortByProp
 * @property {boolean|undefined} [sortDescending]
 * @property {import('eslint').ESLint.LintResultData["rulesMeta"]|undefined} [rulesMeta]
 */

/**
 * Generates formatted summary output from ESLint result set
 *
 * @param   {import('eslint').ESLint.LintResult[]} results  ESLint results
 * @param   {FormatOptions}                        options  Options from process.env
 * @returns {string}                                        The formatted output
 */
export function format(results, options) {
  const { output, sortByProp, sortDescending, rulesMeta = {} } = options;
  const rules = aggregate(results);

  if (sortByProp && ['rule', 'errors', 'warnings'].includes(sortByProp)) {
    const prop = sortByProp === 'rule' ? 'ruleId' : sortByProp;
    const direction = sortDescending ? 'desc' : 'asc';
    sortBy(prop, rules, direction);
  } else {
    // default sorting is by rule / ascending
    sortBy('ruleId', rules, 'asc');
  }

  const markdown = output === 'markdown';

  const header = constructHeader(rules, { markdown });
  const summary = constructSummary(rules, { markdown, rulesMeta });
  const total = constructTotal(rules);

  return `${header}\n${summary}` + (markdown ? '' : `\n${total}`);
}
