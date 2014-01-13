var express = require('express');

var app = express();

require('../../../lib/config')(app);

require('../../../lib/models')(app);

module.exports = app;
