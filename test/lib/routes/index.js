var app = require('../../');

describe('lib/routes', function() {

    var mockup = {
        orders: require('../../../opt/models/orders'),
        products: require('../../../opt/models/products')
    };

    require('./app')(app, mockup);

    require('./orders')(app, mockup);

    require('./products')(app, mockup);

});
