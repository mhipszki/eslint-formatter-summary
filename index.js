const format = require('./dist/index.js');

module.exports = function formatter(results) {
  console.log(format(results, process.env));
};
