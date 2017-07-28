const yargs = require('yargs');

const parse = argv => {
  const args = argv.slice(argv.indexOf('--') + 1);
  return yargs.parse(args);
}

export default parse;
