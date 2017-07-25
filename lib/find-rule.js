module.exports = function findRule(summary, ruleId) {
  return summary.find(function findRuleBy(rule) {
    return ruleId === rule.ruleId;
  });
};
