var chai    = require('chai');
var exempel = require('exempel');

module.exports = function(mockup) {

  var Order = require('../../../../../app/models/order/model');
  var Item = require('../../../../../app/models/order/item/model');
  var Items = require('../../../../../app/models/order/item/collection');
  var Pricing = require('../../../../../app/models/order/pricing/model');
  var Customer = require('../../../../../app/models/order/customer/model');

  describe('Order', function() {

    describe('new Order([source])', function() {

      it('should be an instance of Model', function() {
        var order = new Order();

        chai.expect(order).to.be.an.instanceOf(exempel.Model);
      });

      it('should set attributes to instances', function() {
        var order = new Order();

        chai.expect(order.get('items')).to.be.an.instanceOf(Items);
        chai.expect(order.get('pricing')).to.be.an.instanceOf(Pricing);
        chai.expect(order.get('payment')).to.be.an.instanceOf(Customer);
        chai.expect(order.get('shipment')).to.be.an.instanceOf(Customer);
      });

      it('should set source on instances', function() {
        var order = new Order(mockup.order[0]);

        chai.expect(order.get('items').toJSON()).to.eql(mockup.order[0].items);
        chai.expect(order.get('pricing').toJSON()).to.eql(mockup.order[0].pricing);
        chai.expect(order.get('payment').toJSON()).to.eql(mockup.order[0].payment);
        chai.expect(order.get('shipment').toJSON()).to.eql(mockup.order[0].payment);
      });

      xit('should increase pricing on item push', function() {
        var item = new Item(mockup.order[0].items[0]);
        var order = new Order();

        var price = item.get('pricing') * item.get('quantity');

        order.get('items').push(item);

        chai.expect(order.get('pricing').get('retail')).to.equal(price);
        chai.expect(order.get('pricing').get('total')).to.equal(price);
      });

      it('should decrease pricing on item remove', function() {
        var item = new Item(mockup.order[0].items[0]);
        var order = new Order();

        order.get('items').push(item).remove(item);

        chai.expect(order.get('pricing').get('retail')).to.equal(0);
        chai.expect(order.get('pricing').get('total')).to.equal(0);
      });
    });

    describe('Event: "change"', function() {

      it('should be emitted on items #push', function(done) {
        var order = new Order();

        order.once('change', done).get('items').push(new Item(mockup.order[0].items[0]));
      });

      it('should be emitted on items #remove', function(done) {
        var item = new Item(mockup.order[0].items[0]);
        var order = new Order();

        order.get('items').push(item);
        order.once('change', done).get('items').remove(item);
      });

      it('should be emitted on pricing "change"', function(done) {
        var order = new Order();

        order.once('change', done).get('pricing').addRetail(2.99);
      });

    });

    describe('#toJSON()', function() {
      var object = new Order(mockup.order[0]).toJSON();

      chai.expect(object).to.eql(mockup.order[0]);
      chai.expect(object).to.not.equal(mockup.order[0]);
    });

  });

};
