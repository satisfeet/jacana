var store      = require('store');
var superagent = require('superagent');

var Order = require('./model');

module.exports = function(app) {

  window.order = app.order = createOrder();

  app.order.on('change', function() {
    store.set('order', app.order.toJSON());
  });

  app.order.on('submit', function() {
    superagent.post('/orders')
    .send(app.order)
    .end();
  });

  app('*', function(context, next) {
    context.order = app.order;

    next();
  });

};

function createOrder() {
  return new Order(store.get('order'));
}
