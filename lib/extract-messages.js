const extractMessagesFrom = results => results.reduce(
  (messages, result) => messages.concat(result.messages),
  []
);

export default extractMessagesFrom;
