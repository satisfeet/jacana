var Show = require('./show');
var List = require('./list');

module.exports = function(app) {

  app('/products', function(context, next) {
    var collection = context.products;
    var element    = context.element;

    replace(element, new List(element, collection));
  });

  app('/products/:id', function(context, next) {
    var collection = context.products;
    var element    = context.element;
    var params     = context.params;
    var model      = collection.find({ _id: params.id });

    replace(element, new Show(element, model));
  });

};

function replace(element, view) {
  // will insert view element into selector if not present
  if (!element.contains(view.element)) {
    while (element.lastElementChild) {
      element.lastElementChild.remove();
    }
    element.appendChild(view.element);
  }
  // make function chainable
  return view;
}
