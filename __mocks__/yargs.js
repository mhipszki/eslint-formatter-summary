const yargs = jest.genMockFromModule('yargs');

yargs.parse = args => args;

module.exports = yargs;
