var app = require('../');

describe('lib/static', function() {

  require('./images')(app);

  require('./stylesheets')(app);

  require('./javascripts')(app);

});
