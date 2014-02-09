var util    = require('util');
var http    = require('http');
var express = require('express');

var app = express();

require('./config')(app);

require('./mailer')(app);

require('./models')(app);

require('./engine')(app);

require('./routes')(app);

require('./static')(app);

require('./errors')(app);

require('./cluster')(app);

module.exports = app;
