var app = require('../');

describe('lib/routes', function() {

  var mockup = {
    orders: require('../../../models/order'),
    products: require('../../../models/product')
  };

  require('./app')(app, mockup);

  require('./orders')(app, mockup);

  require('./products')(app, mockup);

});
