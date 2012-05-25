module.exports = Config;
function Config(options) {
  this.email     = options.email;
  this.token     = options.token;
  this.interval  = options.interval || 10 * 1000;
  this.delimiter = options.delimiter || '.';
}
