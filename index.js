const format = require('./dist/format-results');

module.exports = function formatter(results) {
  const { EFS_SORT_BY, EFS_SORT_DESC } = process.env;

  return format(results, {
    EFS_SORT_BY,
    EFS_SORT_DESC,
  });
};
