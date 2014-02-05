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

    replace(element, new List(element, model.get('items')));
  });

  app('/order/payment', function(context, next) {
    var model   = context.order;
    var element = context.element;

    context.navbar.setBrand('Rechnungsinformationen');

    replace(element, new Payment(element, model.get('customer')));
  });

  app('/order/shipment', function(context, next) {
    var model   = context.order;
    var element = context.element;

    context.navbar.setBrand('Versandinformationen');

    replace(element, new Shipment(element, model.get('customer')));
  });

  app('/order/confirm', function(context, next) {
    var model   = context.order;
    var element = context.element;

    context.navbar.setBrand('Bestellbestätigung');

    replace(element, new Confirm(element, model.get('customer')));
  });

  app('/order/goodbye', function(context, next) {
    var model   = context.order;
    var element = context.element;

    context.navbar.setBrand('Vielen Dank');

    replace(element, new Goodbye(element, model.get('customer')));
  });

};

function replace(element, view) {
  if (!element.contains(view.element)) {
    while (element.lastElementChild) {
      element.lastElementChild.remove();
    }
    element.appendChild(view.element);
  }
  // make function chainable
  return view;
}
