import chalk from 'chalk';
import parseArgs from './parse-cli-args';
import pad from './pad-num';
import sum from './sum-up';
import lengthOfLongest from './length-of-longest';
import sortBy from './sort-by-prop';
import aggregate from './aggregator';
import processMessage from './process-message';

function printHeader(len) {
  const sparkles = String.fromCodePoint(0x2728);
  const header = ` ${sparkles}  Summary of failing ESLint rules`.padEnd(len);
  console.log(chalk`{bgBlue ${header}}`);
}

function printTotal(summary) {
  const errors = sum('errors', summary);
  const warnings = sum('warnings', summary);
  const problems = errors + warnings;
  const flames = String.fromCodePoint(0x1f525);
  console.log(chalk`${flames}  {red ${problems} problems in total} (${errors} {red errors}, ${warnings} {yellow warnings})`);
}

function format(results) {
  const summary = aggregate(results);

  const args = parseArgs(process.argv);
  const direction = args.desc ? 'desc' : 'asc';

  if (args.sortBy === 'rule') {
    sortBy('ruleId', summary, direction);
  }
  if (args.sortBy === 'errors') {
    sortBy('errors', summary, direction);
  }
  if (args.sortBy === 'warnings') {
    sortBy('warnings', summary, direction);
  }

  const errorLen = lengthOfLongest('errors', summary);
  const warningLen = lengthOfLongest('warnings', summary);
  const ruleIdLen = lengthOfLongest('ruleId', summary);
  const headerLen = `errors ${'0'.repeat(errorLen)} warnings ${'0'.repeat(warningLen)} rule: ${'0'.repeat(ruleIdLen)}`.length;

  printHeader(headerLen);

  summary.forEach(function print(rule) {
    const errors = pad(rule.errors, errorLen);
    const warnings = pad(rule.warnings, warningLen);
    console.log(chalk`errors {red ${errors}} warnings {yellow ${warnings}} rule: {gray ${rule.ruleId}}`);
  });

  printTotal(summary);
}

export default format;
