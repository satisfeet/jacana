var chai   = require('chai');
var lodash = require('lodash');

module.exports = function(app, mockup) {

  var Model = require('../../../../../app/models/core/model');

  var Product = require('../../../../../app/models/product/model');

  describe('Product', function() {

    describe('new Product([source])', function() {

      it('should be an instance of Model', function() {
        chai.expect(new Product()).to.be.an.instanceOf(Model);
      });

    });

    describe('#order(options)', function() {

      it('should return product', function() {
        var product = new Product();

        chai.expect(product.order()).to.equal(product);
      });

      it('should emit "order" event', function(done) {
        var product = new Product();
        var options = { size: '42-44', color: 'red' };

        product.once('order', function(source) {
          var order = lodash.merge(product.toJSON(), options);

          chai.expect(source).to.eql(order);

          done();
        }).order(options);
      });

    });

  });

};
