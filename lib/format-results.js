import chalk from 'chalk';
import parseArgs from './parse-cli-args';
import pad from './pad-num';
import sum from './sum-up';
import lengthOfLongest from './length-of-longest';
import sortBy from './sort-by-prop';
import aggregate from './aggregator';

const maxErrorLen = rules => lengthOfLongest('errors', rules);
const maxWarningLen = rules => lengthOfLongest('warnings', rules);
const maxRuleLen = rules => lengthOfLongest('ruleId', rules);
const totalErrors = rules => sum('errors', rules);
const totalWarnings = rules => sum('warnings', rules);
const totalProblems = rules => totalErrors(rules) + totalWarnings(rules);

const sparkles = String.fromCodePoint(0x2728);
const flames = String.fromCodePoint(0x1f525);

const constructHeader = rules => {
  const errors = '0'.repeat(maxErrorLen(rules));
  const warnings = '0'.repeat(maxWarningLen(rules));
  const longestRule = '0'.repeat(maxRuleLen(rules));
  const len = `errors ${errors} warnings ${warnings} rule: ${longestRule}`.length;
  const header = ` ${sparkles}  Summary of failing ESLint rules `.padEnd(len);
  return chalk`{bgBlue ${header}}`;
};

const constructSummary = rules => rules.map((rule, i) => {
  const errors = pad(rule.errors, maxErrorLen(rules));
  const warnings = pad(rule.warnings, maxWarningLen(rules));
  const line = chalk`errors {red ${errors}} warnings {yellow ${warnings}} rule: {gray ${rule.ruleId}}`;
  return `${line}\n`;
}).join('');

const constructTotal = rules => chalk`${flames}  {red ${totalProblems(rules)} problems in total} (${totalErrors(rules)} {red errors}, ${totalWarnings(rules)} {yellow warnings})`;

export default function format(results, processArgv) {
  const rules = aggregate(results);

  const args = parseArgs(processArgv);

  if (['rule', 'errors', 'warnings'].includes(args.sortBy)) {
    const prop = args.sortBy === 'rule' ? 'ruleId' : args.sortBy;
    const direction = args.desc ? 'desc' : 'asc';
    sortBy(prop, rules, direction);
  }

  const header = constructHeader(rules);
  const summary = constructSummary(rules);
  const total = constructTotal(rules);

  return `${header}\n${summary}\n${total}`;
}
