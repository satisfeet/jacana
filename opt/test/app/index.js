var mockup = {
  order: require('../../models/order'),
  products: require('../../models/product')
};

describe('app/models3', function() {

  describe('order', function() {

    require('./models/order/model')(mockup);

    require('./models/order/item/model')(mockup);

    require('./models/order/item/collection')(mockup);

    require('./models/order/pricing/model')(mockup);

    require('./models/order/customer/model')(mockup);

  });

  describe('product', function() {

    require('./models/product/model')(mockup);

    require('./models/product/collection')(mockup);

  });

});
