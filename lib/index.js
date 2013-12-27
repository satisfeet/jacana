var util    = require('util');
var http    = require('http');
var express = require('express');

var app = express();

app.server = http.createServer(app);

require('./config')(app);

require('./parser')(app);

require('./logger')(app);

require('./models')(app);

require('./engine')(app);

require('./compress')(app);

require('./static')(app);

require('./routes')(app);

app.server.listen(app.settings.port, listener);

module.exports = app;

function listener() {
    var message = 'application listening on %d';
    
    console.info(util.format(message, app.settings.port));
}
