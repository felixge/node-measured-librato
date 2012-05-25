var Reporter = require('./lib/Reporter');

exports.createReporter = function(config) {
  return new Reporter(config);
};
