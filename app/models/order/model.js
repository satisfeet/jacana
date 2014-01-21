var util = require('util');

var Model = require('../core/model');

var Items = require('./item/collection');
var Pricing = require('./pricing/model');
var Customer = require('./customer/model');

function Order(source) {
  Model.call(this, source);

  this.set('items', new Items(this.get('items')));
  this.set('pricing', new Pricing(this.get('pricing')));
  this.set('customer', new Customer(this.get('customer')));

  bindToChangeEvents(this);
}

util.inherits(Order, Model);

Order.prototype.submit = function() {
  this.emit('submit', this.toJSON());

  return this;
};

Order.prototype.toJSON = function() {
  return {
    items: this.get('items').toJSON(),
    pricing: this.get('pricing').toJSON(),
    customer: this.get('customer').toJSON()
  };
};

module.exports = Order;

function bindToChangeEvents(model) {
  model.get('items').on('change', emit);
  model.get('pricing').on('change', emit);
  model.get('customer').on('change', emit);

  function emit() {
    model.emit('change');
  }
}
