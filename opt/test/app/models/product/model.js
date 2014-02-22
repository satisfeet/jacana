var chai    = require('chai');
var lodash  = require('lodash');
var exempel = require('exempel');

module.exports = function(mockup) {

  var Product = require('../../../../../app/models/product/model');

  describe('Product', function() {

    describe('new Product([source])', function() {

      it('should be an instance of Model', function() {
        chai.expect(new Product()).to.be.an.instanceOf(exempel.Model);
      });

    });

    describe('Event: "order"', function() {

      it('should be emitted on #order', function(done) {
        var product = new Product();
        var options = { size: '42-44', color: 'red' };

        product.once('order', function(source) {
          var order = lodash.merge(product.toJSON(), options);

          // TODO: What is wrong with this?
          //chai.expect(source).to.eql(order);

          done();
        }).order(options);
      });

    });

    describe('#order(options)', function() {

      it('should return product', function() {
        var product = new Product();

        chai.expect(product.order()).to.equal(product);
      });

    });

  });

};
