var app = require('../../');

describe('lib/routes', function() {

    require('./app')(app);

    require('./products')(app);

});
