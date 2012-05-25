var Config         = require('./Config');
var LibratoMetrics = require('librato-metrics');

module.exports = Reporter;
function Reporter(config) {
  this.config       = new Config(config);
  this._interval    = null;
  this._collections = [];
  this._client      = new LibratoMetrics({
    email: this.config.email,
    token: this.config.token,
  });

  this.start();
}

Reporter.prototype.start = function() {
  this.stop();

  this._interval = setInterval(this._report.bind(this), this.config.interval);
};

Reporter.prototype.stop = function() {
  clearInterval(this._interval);
};

Reporter.prototype._report = function() {
  var gauges = this._gauges();
  this._client.post('/metrics', {gauges: gauges}, function(err) {
    if (err) console.log(err);
  });
};

Reporter.prototype._gauges = function() {
  var self   = this;
  var gauges = [];

  this._collections.forEach(function(collection) {
    var prefix = (collection.name)
      ? collection.name + self.config.delimiter
      : '';

    var json = collection.toJSON();
    if (prefix) json = json[collection.name]

    for (var metric in json) {
      var values = json[metric];
      if (typeof values !== 'object') {
        gauges.push({name: prefix + metric, value: values});
        continue;
      }

      for (var key in values) {
        var value = values[key];
        gauges.push({
          name: prefix + metric,
          value: value,
          source: key,
        });
      }
    }
  });

  return gauges;
};

Reporter.prototype.addCollection = function(collection) {
  this._collections.push(collection);
};
