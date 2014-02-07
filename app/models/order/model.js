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

Order.prototype.clear = function() {
  this.get('items').reset();

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
    var pricing = model.get('pricing');

    pricing.set('total', 0);
    pricing.set('retail', 0);
    pricing.set('quantity', 0);

    model.get('items').forEach(function(item) {
      var retail = item.get('pricing.retail');
      var quantity = item.get('pricing.quantity');

      pricing.addRetail(retail * quantity);
      pricing.addQuantity(quantity);
    });

    model.emit('change');
  });
  model.get('pricing').on('change', emit);
  model.get('payment').on('change', emit);
  model.get('shipment').on('change', function(key, value) {
    if (key === 'shipping') model.get('pricing').set('shipment', parseFloat(value));

    emit();
  });

  function emit() {
    model.emit('change');
  }
}
