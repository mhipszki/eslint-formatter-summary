[![Build Status](https://travis-ci.org/mhipszki/eslint-formatter-summary.svg?branch=master)](https://travis-ci.org/mhipszki/eslint-formatter-summary) [![Coverage Status](https://coveralls.io/repos/github/mhipszki/eslint-formatter-summary/badge.svg?branch=master)](https://coveralls.io/github/mhipszki/eslint-formatter-summary?branch=master)

# eslint-formatter-summary

### A specific formatter to support ESLint integration to existing projects

## TL;DR

This formatter simply aggregates the ESLint results _by rule_ and shows the following output:

<img width="715" alt="eslint-output-example-summary" src="https://user-images.githubusercontent.com/220661/28670748-ff4cff36-72d1-11e7-8fc0-b0d6a12c69ea.png">

It can also take CLI arguments for sorting results by rule, errors or warnings e.g.

```
eslint -f node_modules/eslint-formatter-summary . -- --sort-by errors --desc
```

(see details below).

## Intention

It is a matter of minutes to add ESLint to a new project, but can be quite challenging to introduce it (or just add a stricter rule set) to _existing projects_, already large codebases.

Possibly hundreds if not thousands of errors will pop up which can seem overwhelming to be fixed when we see the default formatted output, forcing us to back up from making our code base better / more consistent.

This package provides a custom ESLint formatter to help in these situations to make the right decisions by showing the linting results aggregated by rule. It gives an overview of all rules failing showing the total number of errors and warnings summed up by rule.

Having this _summary_ overview can give us the opportunity e.g. to consider suppressing certain rules for now and bringing them back in later when we are ready to fix them.

## Supported Node versions

The project came alive with the specific intention is to support all Node.js version from `v4.x` as this formatter is supposed to be an _enabler for mostly legacy projects_ and does not want to stand in the way by supporting only the latest Node.js versions.

Therefore `babel-cli` along with `babel-preset-env` are used to transpile only the necessary bits in the source code in order to provide support for older Node.js versions.

The transpiled code is generated under the `dist/` folder and it is the one used to generate the summary output of ESLint rather than the original ES7+ source code under `lib/`.

## Install

If you're using `yarn` just run

```
yarn add --dev eslint-formatter-summary
```

otherwise with `npm` run

```
npm i --save-dev eslint-formatter-summary
```

## Usage

When you run ESLint just specify `eslint-formatter-summary` as the formatter:

```
eslint -f node_modules/eslint-formatter-summary [file|dir|glob]*
```

See http://eslint.org/docs/user-guide/command-line-interface#-f---format

## Output format

With the default ESLint formatter you might get several thousands of lines of failing rules in various files in the output e.g.:

<img width="715" alt="eslint-output-example-default" src="https://user-images.githubusercontent.com/220661/28670749-ff50aae6-72d1-11e7-8458-da73ae458cd2.png">

The summary formatter simply aggregates the ESLint result _by rule_ and shows the following output instead:

<img width="715" alt="eslint-output-example-summary" src="https://user-images.githubusercontent.com/220661/28670748-ff4cff36-72d1-11e7-8fc0-b0d6a12c69ea.png">

In the above example we can notice that the `comma-dangle` rule is responsible for about 2/3 of the failures, so we can consider turning it off or just suppressing it to a warning for now as we can do so with the other failing rules.

## Ordering output

CLI options can be passed to the formatter to alter the output.

With `--sort-by` you can sort the aggregated results by either `rule`, `errors` or `warnings` e.g.

```
eslint -f node_modules/eslint-formatter-summary . -- --sort-by rule
```

the sorted results can be shown either ascending (default) or descending:

```
eslint -f node_modules/eslint-formatter-summary . -- --sort-by rule --desc
```

## TODOs

- run tests on CI on each supported Node version (v4+)
- upgrade to latest Jest v21.x (Babel transformation not working under v21 for some reason)
- add Npm publish / bump scripts (major, minor, patch)
- integrate Greenkeeper.io
- export results as JSON
- export each rules turned off and ready to be added to `.eslintrc`

## Contribute

Please feel free to add an issue describing your proposal if you'd like to discuss and PRs are also welcome!

## License

MIT
