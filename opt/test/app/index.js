var page = require('page');

var app = page;

app.offline = true;

require('../../../app/layout')(app);

require('../../../app/events')(app);

require('../../../app/models')(app);

app.start();

// require test files
require('./models')(app);
