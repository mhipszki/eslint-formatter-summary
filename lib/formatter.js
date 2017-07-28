import chalk from 'chalk';
import parseArgs from './parse-cli-args';
import pad from './pad-num';
import sum from './sum-up';
import lengthOfLongest from './length-of-longest';
import sortBy from './sort-by-prop';
import aggregate from './aggregator';
import processMessage from './process-message';

function constructHeader(len) {
  const sparkles = String.fromCodePoint(0x2728);
  const header = ` ${sparkles}  Summary of failing ESLint rules`.padEnd(len);
  return chalk`{bgBlue ${header}}`;
}

function constructSummary(rules) {
  const errorLen = lengthOfLongest('errors', rules);
  const warningLen = lengthOfLongest('warnings', rules);
  return rules.map(function print(rule) {
    const errors = pad(rule.errors, errorLen);
    const warnings = pad(rule.warnings, warningLen);
    const line = chalk`errors {red ${errors}} warnings {yellow ${warnings}} rule: {gray ${rule.ruleId}}`;
    return `${line}\n`;
  }).join('');
}

function constructTotal(summary) {
  const errors = sum('errors', summary);
  const warnings = sum('warnings', summary);
  const problems = errors + warnings;
  const flames = String.fromCodePoint(0x1f525);
  return chalk`${flames}  {red ${problems} problems in total} (${errors} {red errors}, ${warnings} {yellow warnings})`;
}

export function format(results, processArgv) {
  const rules = aggregate(results);

  const args = parseArgs(processArgv);
  const direction = args.desc ? 'desc' : 'asc';

  if (args.sortBy === 'rule') {
    sortBy('ruleId', rules, direction);
  }
  if (args.sortBy === 'errors') {
    sortBy('errors', rules, direction);
  }
  if (args.sortBy === 'warnings') {
    sortBy('warnings', rules, direction);
  }

  const errorLen = lengthOfLongest('errors', rules);
  const warningLen = lengthOfLongest('warnings', rules);
  const ruleIdLen = lengthOfLongest('ruleId', rules);
  const headerLen = `errors ${'0'.repeat(errorLen)} warnings ${'0'.repeat(warningLen)} rule: ${'0'.repeat(ruleIdLen)}`.length;

  const header = constructHeader(headerLen);
  const summary = constructSummary(rules);
  const total = constructTotal(rules);

  return `${header}\n${summary}\n${total}`;
}

function formatter(results) {
  console.log(format(results, process.argv));
};

export default formatter;
