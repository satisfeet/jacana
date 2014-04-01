var fade = require('fade');

var Show = require('./show');
var List = require('./list');

module.exports = function(app) {

  app('/products', function(context, next) {
    context.navbar.setBrand('Produktübersicht');

    replace(context.element, new List(context.element, context.products));
  });

  app('/products/:id', function(context, next) {
    context.navbar.setBrand('Produktansicht');

    var model = context.products.find({ _id: context.params.id });

    replace(context.element, new Show(context.element, model));
  });

};

function replace(element, view) {
  // will insert view element into selector if not present
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
