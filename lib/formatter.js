const chalk = require('chalk');
const aggregate = require('./aggregator');
const processMessage = require('./process-message');

function pad(num, len) {
  return num.toString().padStart(len);
}

function lengthOfLongest(prop, summary) {
  return summary.reduce(function(length, rule) {
    return Math.max(length, rule[prop].toString().length);
  }, 0);
}

function sumUp(prop, summary) {
  return summary.reduce(function(count, rule) {
    return count + rule[prop];
  }, 0);
}

function printHeader(len) {
  const sparkles = String.fromCodePoint(0x2728);
  const header = ` ${sparkles}  Summary of failing ESLint rules`.padEnd(len);
  console.log(chalk`{bgBlue ${header}}`);
}

function printTotal(summary) {
  const errors = sumUp('errors', summary);
  const warnings = sumUp('warnings', summary);
  const problems = errors + warnings;
  const flames = String.fromCodePoint(0x1f525);
  console.log(chalk`${flames}  {red ${problems} problems in total} (${errors} {red errors}, ${warnings} {yellow warnings})`);
}

function format(results) {
  const summary = aggregate(results);

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

module.exports = format;
