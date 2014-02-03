var template = require('../../views/products');

var ProductInfo = require('./info');
var ProductList = require('./list');

module.exports = function(app) {

  app('/products', function(context, next) {
    var collection = context.products;
    var element    = context.element;

    replace(element, new ProductList(element, collection));
  });

  app('/products/:id', function(context, next) {
    var collection = context.products;
    var element    = context.element;
    var params     = context.params;
    var model      = collection.find({ _id: params.id });

    replace(element, new ProductInfo(element, model));
  });

};

function replace(element, view) {
  // will insert layout template if not present
  if (!element.querySelector('#products')) {
    element.innerHTML = template();
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
