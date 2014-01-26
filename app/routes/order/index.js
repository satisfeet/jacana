var template = require('views/order/content.html');

var OrderList     = require('./list');
var OrderCustomer = require('./customer');

module.exports = function(app) {

  app('/order', function(context, next) {
    var model   = context.order;
    var element = context.element;

    replace(element, new OrderList(element, model.get('items')));
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
    element.innerHTML = template;
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
