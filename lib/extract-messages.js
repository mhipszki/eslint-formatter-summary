/**
 * @param   {import('eslint').ESLint.LintResult[]} results ESLint results
 * @returns {import('eslint').Linter.LintMessage[]}
 */
const extractMessagesFrom = (results) => {
  /** @type {import('eslint').Linter.LintMessage[]} */
  const messages = [];
  for (const result of results) {
    messages.push(...result.messages)
  }
  return messages;
}

export default extractMessagesFrom;
