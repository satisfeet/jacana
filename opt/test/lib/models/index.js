var app = require('../');

describe('lib/models', function() {

    require('./order')(app);

    require('./product')(app);

});
