var chai   = require('chai');
var lodash = require('lodash');

module.exports = function(app, mockup) {

  var Collection = require('../../../../../app/models/core/collection');

  var Product = require('../../../../../app/models/product/model');
  var Products = require('../../../../../app/models/product/collection');

  describe('Products', function() {

    describe('new Products([source])', function() {

      it('should be an instance of Collection', function() {
        chai.expect(new Products()).to.be.an.instanceOf(Collection);
      });

      it('should bind to "order" event on push', function(done) {
        var product = new Product();
        var products = new Products();

        products.once('order', function(source) {
          var order = lodash.merge(product.toJSON(), { foo: 'bar' });

          // TODO: Same here why not eql?
          //chai.expect(source).to.eql(order);

          done();
        }).push(product);

        product.order({ foo: 'bar' });
      });

    });

  });

};
