import extractMessages from './extract-messages';
import processMessage from './process-message';

const aggregate = (results) =>
  extractMessages(results).reduce(processMessage, []);

export default aggregate;
