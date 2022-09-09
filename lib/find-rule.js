/**
 * @param {import('./process-message').MessageSummary[]} summary
 * @param {string} ruleId
 * @returns {import('./process-message').MessageSummary|undefined}
 */
const findRule = (summary, ruleId) =>
  summary.find((rule) => ruleId === rule.ruleId);

export default findRule;
