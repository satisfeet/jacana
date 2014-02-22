var chai    = require('chai');
var exempel = require('exempel');

module.exports = function(mockup) {

  var Pricing = require('../../../../../../app/models/order/pricing/model');

  describe('Pricing', function() {

    describe('new Pricing([source])', function() {

      it('should be an instance of Model', function() {
        chai.expect(new Pricing()).to.be.an.instanceOf(exempel.Model);
      });

      it('should set attributes to zero', function() {
        var pricing = new Pricing();

        chai.expect(pricing.get('retail')).to.equal(0.00);
        chai.expect(pricing.get('total')).to.equal(0.00);
      });

    });

    xdescribe('#addRetail(value)', function() {

      it('should return pricing', function() {
        var pricing = new Pricing();

        chai.expect(pricing.addRetail(2.99)).to.equal(pricing);
      });

      it('should increase attributes by value', function() {
        var pricing = new Pricing({
          retail: 2.99, total: 3.99
        }).addRetail(1.00);

        chai.expect(pricing.get('retail')).to.equal(3.99);
        chai.expect(pricing.get('total')).to.equal(4.99);
      });

    });


    describe('#addQuantity', function() {
      // TODO: stll missing
    });

  });

};
