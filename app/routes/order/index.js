var swig = require('swig');

var template = require('../../views/order/content');

var OrderList     = require('./list');
var OrderCustomer = require('./customer');
var Invoice       = require('./invoice');

module.exports = function(app) {

  app('/order', function(context, next) {
    var model   = context.order;
    var element = context.element;

    replace(element, new OrderList(element, model.get('items')));
  });

  app('/order/1', function(context, next) {
    var model   = context.order;
    var element = context.element;

    replace(element, new Invoice(element, model.get('customer')));
  });

  app('/order/2', function(context, next) {
    // handle customer shipment information
  });

  app('/order/3', function(context, next) {
    // handle customer payment information
  });

  app('/order/4', function(context, next) {
    // final check of customer information
  });

  app('/order/5', function(context, next) {
    // thank customer for buying from satisfeet
  });

  app('/order/customer', function(context, next) {
    var model   = context.order;
    var element = context.element;

    replace(element, new OrderCustomer(element, model.get('customer')));
  });

};

function replace(element, view) {
  // will insert layout template if not present
  if (!element.querySelector('#order')) {
    element.innerHTML = swig.render(template);
  }
  // will insert view element into selector if not present
  if (!element.contains(view.element)) {
    element = element.querySelector('#inner');
    while (element.lastElementChild) {
      element.lastElementChild.remove();
    }
    element.appendChild(view.element);
  }
  // make function chainable
  return view;
}
