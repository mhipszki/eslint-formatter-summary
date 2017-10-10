const findRule = (summary, ruleId) =>
  summary.find(rule => ruleId === rule.ruleId);

export default findRule;
