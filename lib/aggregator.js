import extractMessages from './extract-messages';
import processMessage from './process-message';

/**
 * @param {import('eslint').ESLint.LintResult[]} results  ESLint results
 * @returns {import('./process-message').MessageSummary[]}
 */
const aggregate = (results) => {
  const messages = extractMessages(results);

  /** @type {import('./process-message').MessageSummary[]} */
  let summary = [];

  for (const message of messages) {
    summary = processMessage(summary, message);
  }

  return summary;
}

export default aggregate;
