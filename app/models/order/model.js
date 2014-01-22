var util = require('util');

var Model    = require('../core/model');
var Items    = require('./item/collection');
var Pricing  = require('./pricing/model');
var Customer = require('./customer/model');

function Order(source) {
  Model.call(this, source);

  setupAttributes(this);
  listenToPushEvent(this);
  listenToRemoveEvent(this);
  listenToChangeEvent(this);
  listenToSubmitEvent(this);
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

function setupAttributes(model) {
  model.set('items', new Items(model.get('items')));
  model.set('pricing', new Pricing(model.get('pricing')));
  model.set('customer', new Customer(model.get('customer')));
}

function listenToPushEvent(model) {
  model.get('items').on('push', function(item) {
    var retail = item.get('pricing') * item.get('quantity');

    model.get('pricing').addRetail(retail);
  });
}

function listenToRemoveEvent(model) {
  model.get('items').on('remove', function(item) {
    var retail = item.get('pricing') * item.get('quantity');

    model.get('pricing').subRetail(retail);
  });
}

function listenToChangeEvent(model) {
  model.get('items').on('change', emit);
  model.get('pricing').on('change', emit);
  model.get('customer').on('change', emit);

  function emit() {
    model.emit('change');
  }
}

function listenToSubmitEvent(model) {
  model.get('customer').on('submit', function() {
    model.submit();
  });
}
