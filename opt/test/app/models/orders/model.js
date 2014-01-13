var events = require('events');
var should = require('should');

module.exports = function(app, mockup) {

    var order = app.order;

    describe('order', function() {

        var item, items = mockup.orders[0].items;

        describe('#createItem', function() {
            
            it('should return item', function() {
                item = order.createItem(items[0]);
                
                item.attributes.should.equal(items[0]);
            });

        });
        
        describe('#addItem', function() {
            
            it('should add item to order', function() {
                order.addItem(item);

                order.attributes.items.should.contain(item);
            });

            it('should increase pricing of order', function() {
                var price = order.attributes.pricing.retail + 
                    item.attributes.pricing * item.attributes.quantity;

                order.addItem(item);

                order.attributes.pricing.retail.should.equal(price);
                order.attributes.pricing.total.should.equal(price);
            });

        });

        describe('#removeItem', function() {
            
            it('should remove item from order', function() {
                order.removeItem(item);

                order.attributes.items.should.not.contain(item);
            });

            it('should decrease pricing of order', function() {
                order.removeItem(item);

                order.attributes.pricing.retail.should.equal(0);
                order.attributes.pricing.total.should.equal(0);
            });

        });

        describe('#toJSON', function() {

            it('should return serialized object', function() {
                var object = order.toJSON();

                //order.customer.should.eql(order.attributes.customer);
                //order.pricing.should.eql(order.attributes.pricing);
                
                //order.items.forEach(function(value, index) {
                //    value.should.eql(order.attributes.items[index]);
                //});
            });

        });

    });

};
