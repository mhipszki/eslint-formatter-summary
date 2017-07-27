# ESLint Summary Formatter

It is a matter of minutes to add ESLint to a new project, but can be quite challenging to introduce it (or just add a stricter rule set) to an _existing projects_.

Possibly hundreds if not thousands of errors will pop up which can seem overwhelming to be fixed when we see the default formatted output, forcing us to back up from making our code base better / more consistent.

This package provides a custom ESLint formatter to help in these situations to make the right decisions by showing the linting results aggregated by rule. It gives a good overview of which rules are failing with errors and warnings summed up by rule.

Having this _summary_ overview can give us the opportunity e.g. to consider suppressing certain rules for now and bringing them back in later when we are ready to fix them.

## Install

If you're using `yarn` just run

```
yarn add --dev eslint-summary-formatter
```

otherwise with `npm` run

```
npm i --save-dev eslint-summary-formatter
```

## Usage

When you run ESLint just specify `eslint-summary-formatter` as the formatter:

```
eslint -f eslint-summary-formatter [file|dir|glob]*
```

See http://eslint.org/docs/user-guide/command-line-interface#-f---format

## Output format

With the default ESLint formatter you might get several thousands of lines of failing rules in various files in the output e.g.:

<img width="715" alt="eslint-output-example-default" src="https://user-images.githubusercontent.com/220661/28670749-ff50aae6-72d1-11e7-8458-da73ae458cd2.png">

The summary formatter simply aggregates the ESLint result _by rule_ and shows the following output instead:

<img width="715" alt="eslint-output-example-summary" src="https://user-images.githubusercontent.com/220661/28670748-ff4cff36-72d1-11e7-8fc0-b0d6a12c69ea.png">

## Contribute

Please feel free to add an issue describing your proposal if you'd like to discuss and PRs are also welcome!

## License

MIT
