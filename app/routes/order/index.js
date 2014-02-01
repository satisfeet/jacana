var swig = require('swig');

var template = require('../../views/order/content');

var List     = require('./list');
var Invoice  = require('./invoice');
var Shipment = require('./shipment');
var Payment  = require('./payment');
var Goodbye  = require('./goodbye');
var Confirm  = require('./confirm');

module.exports = function(app) {

  app('/order', function(context, next) {
    var model   = context.order;
    var element = context.element;

    replace(element, new List(element, model.get('items')));
  });

  app('/order/1', function(context, next) {
    var model   = context.order;
    var element = context.element;

    replace(element, new Invoice(element, model.get('customer')));
  });

  app('/order/2', function(context, next) {
    var model   = context.order;
    var element = context.element;

    replace(element, new Shipment(element, model.get('customer')));
  });

  app('/order/3', function(context, next) {
    var model   = context.order;
    var element = context.element;

    replace(element, new Payment(element, model.get('customer')));
  });

  app('/order/4', function(context, next) {
    var model   = context.order;
    var element = context.element;

    replace(element, new Confirm(element, model.get('customer')));
  });

  app('/order/5', function(context, next) {
    var model   = context.order;
    var element = context.element;

    replace(element, new Goodbye(element, model.get('customer')));
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
