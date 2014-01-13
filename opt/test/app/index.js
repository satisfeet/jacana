var page = require('page');

var app = page;

app.offline = true;

require('../../../app/query')(app);

require('../../../app/events')(app);

require('../../../app/models')(app);

app.start();

module.exports = app;
