const format = require('./dist/format-results');

module.exports = function formatter(results) {
  const { SORT_BY, DESC } = process.env;

  return format(results, {
    SORT_BY,
    DESC,
  });
};
