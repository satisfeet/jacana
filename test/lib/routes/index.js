var app = require('../../');

describe('lib/routes', function() {

    require('./app')(app);

    require('./orders')(app);

    require('./products')(app);

});
