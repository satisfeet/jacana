var app = require('../');

describe('app/models', function() {

    var mockup = {
        orders: require('../../../opt/models/orders'),
        products: require('../../../opt/models/products')
    };

    require('./orders')(app, mockup);

    require('./products')(app, mockup);

});
