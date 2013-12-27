var app = require('../../');

describe('lib/routes', function() {

    require('./application')(app);
    require('./products')(app);

});
