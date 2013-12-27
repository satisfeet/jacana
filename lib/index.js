var util    = require('util');
var http    = require('http');
var express = require('express');

var app = express();

require('./config')(app);

require('./parser')(app);

require('./logger')(app);

require('./models')(app);

require('./engine')(app);

require('./compress')(app);

require('./static')(app);

require('./routes')(app);

require('./cluster')(app);

module.exports = app;
