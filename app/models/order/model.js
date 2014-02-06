var util    = require('util');
var exempel = require('exempel');

var Items    = require('./item/collection');
var Pricing  = require('./pricing/model');
var Customer = require('./customer/model');

function Order(source) {
  exempel.Model.call(this, source);

  this.set('items', new Items(this.get('items')));
  this.set('pricing', new Pricing(this.get('pricing')));
  this.set('payment', new Customer(this.get('payment')));
  this.set('shipment', new Customer(this.get('shipment')));

  listenToChangeEvent(this);
}

util.inherits(Order, exempel.Model);

Order.prototype.submit = function() {
  this.emit('submit', this.toJSON());

  return this;
};

Order.prototype.toJSON = function() {
  return {
    items: this.get('items').toJSON(),
    pricing: this.get('pricing').toJSON(),
    payment: this.get('payment').toJSON(),
    shipment: this.get('shipment').toJSON()
  };
};

module.exports = Order;

function listenToChangeEvent(model) {
  model.get('items').on('change', function() {
    model.get('pricing').set('total', 0);
    model.get('pricing').set('retail', 0);

    model.get('items').forEach(function(item) {
      var retail = item.get('pricing.total');

      model.get('pricing').addRetail(retail);
    });

    model.emit('change');
  });
  model.get('pricing').on('change', emit);
  model.get('payment').on('change', emit);
  model.get('shipment').on('change', emit);

  function emit() {
    model.emit('change');
  }
}
