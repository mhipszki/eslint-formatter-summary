const extractMessagesFrom = require('../extract-messages');

test('returns a flat array of messages of ESLint result objects', () => {
  const results = [{
    messages: ['rule-1-message-1', 'rule-1-message-2']
  },{
    messages: ['rule-2-message-1']
  }];
  const messages = extractMessagesFrom(results);
  expect(messages).toEqual([
    'rule-1-message-1',
    'rule-1-message-2',
    'rule-2-message-1'
  ]);
});
