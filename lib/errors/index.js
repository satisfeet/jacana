var client = require('./client');
var server = require('./server');

module.exports = function(app) {

  app.use(client.notFoundError);

  app.use(server.internalError);

};
