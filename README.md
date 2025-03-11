🎉🎉🎉 New `v2` version is out with up-to-date dependencies! 🎉🎉🎉

[![Build](https://github.com/mhipszki/eslint-formatter-summary/actions/workflows/ci.yml/badge.svg)](https://github.com/mhipszki/eslint-formatter-summary/actions) [![npm](https://img.shields.io/npm/v/eslint-formatter-summary.svg)](https://www.npmjs.com/package/eslint-formatter-summary) [![styled with prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Coverage Status](https://coveralls.io/repos/github/mhipszki/eslint-formatter-summary/badge.svg?branch=master)](https://coveralls.io/github/mhipszki/eslint-formatter-summary?branch=master) [![license](https://img.shields.io/github/license/mhipszki/eslint-formatter-summary.svg)](https://github.com/mhipszki/eslint-formatter-summary/blob/master/LICENSE)

# eslint-formatter-summary

> [ESLint](https://eslint.org) formatter aggregating results by rule

## Features

- aggregated errors / warnings **per rule**
- **sort by** rule name, number of errors or warnings

## TL;DR

This formatter simply aggregates the ESLint results _by rule_ and shows the following output:

<img width="715" alt="eslint-output-example-summary" src="https://user-images.githubusercontent.com/220661/28670748-ff4cff36-72d1-11e7-8fc0-b0d6a12c69ea.png">

It can also be configured to sort results by rule, errors or warnings using env vars e.g.

```shell
SORT_BY=rule DESC=true eslint -f summary ./src
```

(see details below).

## How to install

```shell
npm i -D eslint-formatter-summary
// or
yarn add -D eslint-formatter-summary
```

## How to use

When you run ESLint just specify `eslint-formatter-summary` as the formatter:

```shell
eslint -f summary [file|dir|glob]*
```

See http://eslint.org/docs/user-guide/command-line-interface#-f---format

## Intention

It is a matter of minutes to add ESLint to a new project, however it can be quite challenging to introduce it (or just add a stricter rule set) to _existing projects_, already large codebases.

Possibly hundreds if not thousands of errors will pop up which can seem overwhelming to be fixed when we see the default formatted output, forcing us to back up from making our code base better / more consistent.

This package provides a custom ESLint formatter to help in these situations to make the right decisions by showing the linting results aggregated by rule. It gives an overview of all rules failing showing the total number of errors and warnings summed up by rule.

Having this _summary_ overview can give us the opportunity e.g. to consider suppressing certain rules for now and bringing them back in later when we are ready to fix them.

## Output format

With the default ESLint formatter you might get several thousands of lines of failing rules in various files in the output e.g.:

<img width="715" alt="eslint-output-example-default" src="https://user-images.githubusercontent.com/220661/28670749-ff50aae6-72d1-11e7-8458-da73ae458cd2.png">

The Summary Formatter simply aggregates the ESLint results _by rule_ and shows the following output instead:

<img width="715" alt="eslint-output-example-summary" src="https://user-images.githubusercontent.com/220661/28670748-ff4cff36-72d1-11e7-8fc0-b0d6a12c69ea.png">

In the above example we can notice that the `comma-dangle` rule is responsible for about 2/3 of the failures, so we can consider turning it off or just suppressing it to a warning for now as we can do so with the other failing rules.

## Sorting output

> Default sorting is by `rule` in an `ascending` order

Configuration options can be passed to the formatter to alter the output.

Using the`SORT_BY` env var the aggregated results can be sorted by either `rule`, `errors` or `warnings` e.g.

```shell
SORT_BY=rule eslint -f summary ./src
```

the sorted results are shown in ASCENDING order by default but the order can also be reversed using `DESC=true`:

```shell
SORT_BY=rule DESC=true eslint -f summary ./src
```

## Supported ESLint versions

`ESLint` versions are supported from `v7` onwards, although `eslint-formatter-summary` may also work with lower versions of ESLint. Please open an issue if you need support for other versions of ESLint.

## Supported Node versions

Although the project _used to_ support old Node.js versions, time has passed and it is only tested on the latest LTS version of Node.js.

_Should you need support for older versions of Node.js please get in touch and open an issue._

## Contributing

Please feel free to submit an issue describing your proposal you would like to discuss. For more details see [CONTRIBUTING docs](CONTRIBUTING.md)

## Possible improvements / planned features

- allow different output showing files with aggregated number of errors / warnings
- export output in different formats e.g. JSON, markdown etc.
- show total number of files #34
- allow installing package on demand #35

## License

MIT
