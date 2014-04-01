var util    = require('util');
var http    = require('http');
var express = require('express');

var app = express();

require('./config')(app);

require('./mailer')(app);

require('./builds')(app);

require('./styles')(app);

require('./views')(app);

require('./routes')(app);

require('./static')(app);

require('./errors')(app);

require('./server')(app);

module.exports = app;
