var http    = require('http');
var express = require('express');

var app = express();

app.server = http.createServer(app);

require('../../../lib/config')(app);

require('../../../lib/mailer')(app);

require('../../../lib/models')(app);

require('../../../lib/engine')(app);

require('../../../lib/static')(app);

require('../../../lib/routes')(app);

app.server.listen(app.settings.port);

module.exports = app;
