var store      = require('store');
var superagent = require('superagent');

var Order     = require('./model');
var OrderItem = require('./item/model');

module.exports = function(app) {

  app('*', function(context, next) {
    createOrder(context);

    listenToOrderEvent(context);
    listenToChangeEvent(context);
    listenToSubmitEvent(context);

    next();
  });

};

function createOrder(context) {
  context.order = new Order(store.get('order'));

  context.navbar.setOrderBadge(context.order.get('items').models.length);
}

function listenToOrderEvent(context) {
  context.products.on('order', function(source) {
    var items = context.order.get('items');

    items.push(new OrderItem(source));
  });
}

function listenToChangeEvent(context) {
  context.order.on('change', function() {
    store.set('order', context.order);

    context.navbar.setOrderBadge(context.order.get('items').models.length);
  });
}

function listenToSubmitEvent(context) {
  context.order.on('submit', function() {
    var request = superagent.post('/orders');

    request.send(context.order);
    request.end();
  });
}
