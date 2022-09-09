export default function resultFactory(failingRules) {
  const messages = failingRules.map(function (rule) {
    const ruleId = rule[0];
    const severity = rule[1];
    return {
      ruleId,
      severity,
      message: `'${ruleId}' has failed`,
      line: 1,
      column: 1,
      nodeType: 'Identifier',
      source: "const foo = 'bar';",
    };
  });
  return {
    messages,
  };
}
