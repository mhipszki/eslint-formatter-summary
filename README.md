# ESLint Summary Formatter

It is a matter of minutes to add ESLint to a new project, but can be quite challenging to introduce it (or just add a stricter rule set) to an _existing projects_. Possibly hundreds if not thousands of errors will pop up which can seem overwhelming to be fixed when we see the default formatted output, forcing us to back up from making our code base better / more consistent.

This package provides a custom ESLint formatter to help in these situations making the right decisions by showing the linting results aggregated by rule. It gives a good overview of which rules are failing with errors and warnings summed up by rule. Having this overview can give us the opportunity to consider e.g. suppressing certain rules for now and bringing them back in later when we are ready to fix them.
