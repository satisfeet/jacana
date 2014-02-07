var store      = require('store');
var lodash     = require('lodash');
var superagent = require('superagent');

var Order     = require('./model');
var OrderItem = require('./item/model');

module.exports = function(app) {

  app('*', function(context, next) {
    window.order = context.order = new Order(store.get('order'));

    listenToOrderEvent(context);
    listenToChangeEvent(context);
    listenToSubmitEvent(context);
    listenToRemoveEvent(context);

    var itemsLength = context.order.get('items').length;
    context.navbar.setOrderBadge(itemsLength);

    next();
  });

};

function listenToOrderEvent(context) {
  context.products.on('order', function(product, options) {
    var item = new OrderItem(product.toJSON());

    lodash.forIn(options, function(value, key) {
      item.set(key, value);
    });

    context.order.get('items').push(item);
  });
}

function listenToChangeEvent(context) {
  context.order.on('change', function() {
    store.set('order', context.order);

    context.navbar.setOrderBadge(context.order.get('items').length);
  });
}

function listenToSubmitEvent(context) {
  context.order.on('submit', function() {
    var request = superagent.post('/orders');

    request.send(context.order);
    request.end();
  });
}

function listenToRemoveEvent(context) {
  context.order.once('remove', function() {
    context.order.removeAllListeners();

    store.remove('order');
  });
}
