var util    = require('util');
var http    = require('http');
var express = require('express');

var app = express();

require('./config')(app);

require('./models')(app);

require('./mailer')(app);

require('./engine')(app);

require('./routes')(app);

require('./static')(app);

require('./errors')(app);

require('./server')(app);

module.exports = app;
