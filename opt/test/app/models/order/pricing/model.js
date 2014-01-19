var chai = require('chai');

module.exports = function(app) {

    var Model = require('../../../../../../app/models/core/model');

    var Pricing = require('../../../../../../app/models/order/pricing/model');

    describe('Pricing', function() {

        describe('new Pricing([source])', function() {

            it('should be an instance of Model', function() {
                chai.expect(new Pricing()).to.be.an.instanceOf(Model);
            });

            it('should set attributes to zero', function() {
                var pricing = new Pricing();

                chai.expect(pricing.get('retail')).to.equal(0.00);
                chai.expect(pricing.get('total')).to.equal(0.00);
            });

        });

        describe('#addRetail(value)', function() {

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

        describe('#subRetail(value)', function() {

            it('should return pricing', function() {
                var pricing = new Pricing();

                chai.expect(pricing.subRetail(2.99)).to.equal(pricing);
            });

            it('should decrease attributes by value', function() {
                var pricing = new Pricing({
                    retail: 2.99, total: 3.99
                }).subRetail(1.00);

                chai.expect(pricing.get('retail')).to.equal(1.99);
                chai.expect(pricing.get('total')).to.equal(2.99);
            });

        });

    });

};
