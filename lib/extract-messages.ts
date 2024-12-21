import { ESLint, Linter } from 'eslint';

export const extractMessages = (
  results: ESLint.LintResult[],
): Linter.LintMessage[] =>
  results.reduce<Linter.LintMessage[]>(
    (messages, result) => messages.concat(result.messages),
    [],
  );
