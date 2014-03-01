var page = require('page');
var fade = require('fade');

var List     = require('./list');
var Shipment = require('./shipment');
var Payment  = require('./payment');
var Goodbye  = require('./goodbye');
var Confirm  = require('./confirm');

module.exports = function(app) {

  app('/order', function(context, next) {
    var model   = context.order;
    var element = context.element;

    context.navbar.setBrand('Bestellübersicht');

    replace(element, new List(element, model));
  });

  app('/order/payment', checkItems, function(context, next) {
    var model   = context.order;
    var element = context.element;

    context.navbar.setBrand('Rechnungsinformationen');

    replace(element, new Payment(element, model));
  });

  app('/order/shipment', checkItems, function(context, next) {
    var model   = context.order;
    var element = context.element;

    context.navbar.setBrand('Versandinformationen');

    replace(element, new Shipment(element, model));
  });

  app('/order/confirm', checkItems, function(context, next) {
    var model   = context.order;
    var element = context.element;

    context.navbar.setBrand('Bestellbestätigung');

    replace(element, new Confirm(element, model));
  });

  app('/order/goodbye', checkItems, function(context, next) {
    var model   = context.order;
    var element = context.element;

    context.navbar.setBrand('Vielen Dank');

    replace(element, new Goodbye(element, model));
  });

};

function replace(element, view) {
  if (element.lastElementChild !== view.element) {
    while (element.lastElementChild) {
      element.lastElementChild.remove();
    }
    element.appendChild(view.element);
  }
  // fade in element
  fade.in(element);
  // make function chainable
  return view;
}

function checkItems(context, next) {
  if (context.order.get('items').length) return next();

  page('/products');
}
