# How to contribute

## Install dependencies

```
npm i
```

## Changing code

Code has been re-written using TypeScript. It relies on ESLint's exported types to make sure it is fully compatible with ESLint's API.

When changing code, you might want to run unit tests on file changes:

```
npm run test
```

## Building the project

```
npm run build
```

## Test building project

Once the project is built the distribution version can be tested via passing a `.js` file to `npm run try`.

For example:

```
npm run try test.js
```

## Commit linting

In order to utilise [Semantic Versioning](...TODO...) each commit should be classified according to standard [commitlint](https://commitlint.js.org/) rules.

Commit messages with `feat` and `fix` prefixes will be automatically included in release notes.

## CI and quality checks

During the CI build source code is linted and unit tests need to pass resulting in a coverage report.

## Publishing new versions

The project uses [semantic versioning](...TODO...). New versions are automatically generated on CI and published after a PR has been merged in.

`patch` versions are used to fix bugs and upgrade dependencies. `minor` versions are used to add new _non-breaking_ features. `major` version is bumped when there are significant changes which could break projects already using `eslint-formatter-summary`.
