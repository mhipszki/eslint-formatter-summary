import { ESLint, Linter } from 'eslint';

type Rule = [string, Linter.LintMessage['severity']];

export const mockLintResult = (failingRules: Rule[]): ESLint.LintResult => {
  return {
    filePath: '',
    messages: failingRules.map<Linter.LintMessage>((rule) =>
      mockLintMessage(rule),
    ),
    suppressedMessages: [],
    errorCount: 1,
    fatalErrorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    usedDeprecatedRules: [],
  };
};

export const mockLintMessage = (rule: Rule): Linter.LintMessage => {
  const ruleId = rule[0];
  const severity = rule[1];
  return {
    ruleId,
    severity,
    message: `'${ruleId}' has failed`,
    line: 1,
    column: 1,
    nodeType: 'Identifier',
  };
};
