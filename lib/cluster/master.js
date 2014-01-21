var os      = require('os');
var util    = require('util');
var cluster = require('cluster');

module.exports = function(app) {
  var max = os.cpus().length;

  for (var i = 0; i < max; i++) {
    cluster.fork();
  }

  cluster.on('fork', function(worker) {
    console.log(util.format('application forked worker', worker.id));
  });

  cluster.on('exit', function(worker) {
    console.log(util.format('application exited worker', worker.id));
  });

};
