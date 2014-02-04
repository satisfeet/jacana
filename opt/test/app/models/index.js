module.exports = function(app) {

  var mockup = {
    order: require('../../../models/order'),
    products: require('../../../models/product')
  };

  describe('app/models3', function() {

    describe('order', function() {

      require('./order/model')(app, mockup);

      require('./order/item/model')(app, mockup);

      require('./order/item/collection')(app, mockup);

      require('./order/pricing/model')(app, mockup);

      require('./order/customer/model')(app, mockup);

    });

    describe('product', function() {

      require('./product/model')(app, mockup);

      require('./product/collection')(app, mockup);

    });

  });

};
