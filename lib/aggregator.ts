import { ESLint } from 'eslint';
import extractMessages from './extract-messages';
import { Rule } from './length-of-longest';
import processMessage from './process-message';

export const aggregate = (results: ESLint.LintResult[]): Rule[] =>
  extractMessages(results).reduce(processMessage, []);
