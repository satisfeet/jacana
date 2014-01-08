var bin = require('../../../bin/models');

describe('bin/models', function() {

    require('./orders')(bin);

    require('./products')(bin);

});
