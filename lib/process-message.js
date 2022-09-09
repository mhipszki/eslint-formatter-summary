import findRule from './find-rule.js';

/**
 * @typedef MessageSummary
 * @property {string} ruleId
 * @property {number} errors
 * @property {number} warnings
 */

/**
 * @param   {MessageSummary[]} summary
 * @param   {import('eslint').Linter.LintMessage} message
 * @returns {MessageSummary[]}
 */
const processMessage = (summary, message) => {
  if (typeof message.ruleId === 'undefined') return summary;

  const ruleId = message.ruleId !== null ? message.ruleId : 'syntax error';
  const severity = message.severity;
  const errors = severity === 2 ? 1 : 0;
  const warnings = severity === 1 ? 1 : 0;
  const rule = findRule(summary, ruleId);
  if (!rule) {
    summary.push({ ruleId, errors, warnings });
  } else {
    rule.errors += errors;
    rule.warnings += warnings;
  }
  return summary;
};

export default processMessage;
