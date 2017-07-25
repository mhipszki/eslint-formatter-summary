const extractMessagesFrom = require('./extract-messages');
const processMessage = require('./process-message');

function aggregate(results) {
  const allMessages = extractMessagesFrom(results);
  return allMessages.reduce(processMessage, []);
}

module.exports = aggregate;
