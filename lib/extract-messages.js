module.exports = function extractMessagesFrom(results) {
  return results.reduce(function(messages, result) {
    return messages.concat(result.messages);
  }, []);
}
