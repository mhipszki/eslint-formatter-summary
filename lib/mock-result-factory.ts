import { ESLint, Linter } from 'eslint';

type Rule = [string, Linter.LintMessage['severity']];

export default function resultFactory(failingRules: Rule[]): ESLint.LintResult {
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
    filePath: '',
    messages,
    suppressedMessages: [],
    errorCount: 1,
    fatalErrorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    usedDeprecatedRules: [],
  };
}
