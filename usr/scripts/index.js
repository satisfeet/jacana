var page = require('page');

var app = page;

require('./layout')(app);

require('./events')(app);

require('./models')(app);

require('./routes')(app);

require('./errors')(app);

app.start();
