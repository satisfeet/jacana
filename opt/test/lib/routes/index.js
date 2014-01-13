var app = require('../');

describe('lib/routes', function() {

    var mockup = {
        orders: require('../../../models/orders'),
        products: require('../../../models/products')
    };

    require('./app')(app, mockup);

    require('./orders')(app, mockup);

    require('./products')(app, mockup);

});
