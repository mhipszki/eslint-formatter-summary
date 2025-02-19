import { ESLint, Linter } from 'eslint';

export type Rule = { ruleId: string; errors: number; warnings: number };

export const aggregate = (results: ESLint.LintResult[]): Rule[] =>
  extractMessages(results).reduce(processMessage, []);

export const extractMessages = (
  results: ESLint.LintResult[],
): Linter.LintMessage[] =>
  results.reduce<Linter.LintMessage[]>(
    (messages, result) => messages.concat(result.messages),
    [],
  );

export const processMessage = (
  summary: Rule[],
  message: Linter.LintMessage,
) => {
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

export const findRule = (summary: Rule[], ruleId: string) =>
  summary.find((rule) => ruleId === rule.ruleId);
