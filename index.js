var util    = require('util');
var http    = require('http');
var express = require('express');

var app = express();

require('./config')(app);

require('./mailer')(app);

require('./models')(app);

require('./builder')(app);

require('./styles')(app);

require('./views')(app);

require('./routes')(app);

require('./static')(app);

require('./errors')(app);

module.exports = app;

app.server = http.createServer(app);

app.server.listen(app.settings.server.port, app.settings.server.ip, function() {
  console.log(util.format('listening on ip %s', app.settings.server.ip));
  console.log(util.format('listening on port %s', app.settings.server.port));
});
