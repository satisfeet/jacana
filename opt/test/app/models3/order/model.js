var chai = require('chai');

module.exports = function(app, mockup) {

    var Model = require('../../../../../app/models3/core/model');

    var Order = require('../../../../../app/models3/order/model');
    var Items = require('../../../../../app/models3/order/item/collection');
    var Pricing = require('../../../../../app/models3/order/pricing/model');
    var Customer = require('../../../../../app/models3/order/customer/model');

    describe('Order', function() {

        describe('new Order([source])', function() {

            it('should be an instance of Model', function() {
                var order = new Order();

                chai.expect(order).to.be.an.instanceOf(Model);
            });

            it('should set attributes to instances', function() {
                var order = new Order();

                chai.expect(order.get('items'))
                    .to.be.an.instanceOf(Items);
                chai.expect(order.get('pricing'))
                    .to.be.an.instanceOf(Pricing);
                chai.expect(order.get('customer'))
                    .to.be.an.instanceOf(Customer);
            });

            it('should set source on instances', function() {
                var order = new Order(mockup.order[0]);

                chai.expect(order.get('items').toJSON())
                    .to.eql(mockup.order[0].items);
                chai.expect(order.get('pricing').toJSON())
                    .to.eql(mockup.order[0].pricing);
                chai.expect(order.get('customer').toJSON())
                    .to.eql(mockup.order[0].customer);
            });

        });

        describe('#toJSON()', function() {
            var object = new Order(mockup.order[0]).toJSON();

            chai.expect(object).to.eql(mockup.order[0]);
            chai.expect(object).to.not.equal(mockup.order[0]);
        });

    });

};
