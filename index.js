const format = require('./dist/format-results');

module.exports = function formatter(results) {
  const { SORT_BY, DESC } = process.env;

  console.log(
    format(results, {
      SORT_BY,
      DESC,
    })
  );
};
