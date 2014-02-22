var chai    = require('chai');
var lodash  = require('lodash');
var exempel = require('exempel');

module.exports = function(mockup) {

  var Product    = require('../../../../../app/models/product/model');
  var Products   = require('../../../../../app/models/product/collection');

  describe('Products', function() {

    describe('new Products([source])', function() {

      it('should be an instance of Collection', function() {
        chai.expect(new Products()).to.be.an.instanceOf(exempel.Collection);
      });

    });

    describe('Event: "order"', function() {

      it('should be emitted on product "order"', function(done) {
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
