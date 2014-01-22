var store      = require('store');
var superagent = require('superagent');

var Order     = require('./model');
var OrderItem = require('./item/model');

module.exports = function(app) {

  app('*', function(context, next) {
    createOrder(context);

    bindToOrderEvent(context);
    bindToChangeEvent(context);
    bindToSubmitEvent(context);

    next();
  });

};

function createOrder(context) {
  context.order = new Order(store.get('order'));
}

function bindToOrderEvent(context) {
  context.products.on('order', function(source) {
    var items = context.order.get('items');

    items.push(new OrderItem(source));
  });
}

function bindToChangeEvent(context) {
  context.order.on('change', function() {
    store.set('order', context.order);
  });
}

function bindToSubmitEvent(context) {
  context.order.on('submit', function() {
    var request = superagent.post('/orders');

    request.send(context.order);
    request.end();
  });
}
