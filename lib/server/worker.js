var http = require('http');
var util = require('util');

module.exports = function(app) {

  var options = app.server;

  http.createServer(app.callback()).listen(options.port, function() {
    console.log(util.format('listening on port %d', options.port));
  });

};
