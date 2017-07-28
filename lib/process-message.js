import findRule from './find-rule';

const processMessage = (summary, message) => {
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
