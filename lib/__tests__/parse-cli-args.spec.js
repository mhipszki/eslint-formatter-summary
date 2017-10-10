import parse from '../parse-cli-args';

jest.mock('yargs');

test('only parses CLI arguments after `--`', () => {
  expect(
    parse([
      'eslint',
      '-f',
      'summary-formatter',
      '.',
      '--',
      '--some-option',
      '--other-option'
    ])
  ).toEqual(['--some-option', '--other-option']);
});
