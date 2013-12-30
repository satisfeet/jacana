var page = require('page');

var app = page;

require('./query')(app);

require('./events')(app);

require('./models')(app);

require('./routes')(app);

app.start({
    dispatch: true
});
