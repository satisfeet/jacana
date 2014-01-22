var util   = require('util');
var swig   = require('swig');
var domify = require('domify');
var lodash = require('lodash');

var template = require('views/store/product/index.html');

function Product(element, model) {
  this.element = element.querySelector('#product-info');

  setupElement(this.element, model, this);
  bindToSubmit(this.element, model, this);
}

module.exports = Product;

function setupElement(element, model, view) {
  // render template if this is the wrong product id
  if (!view.element || view.element.dataset.id !== model.get('_id')) {
    view.element = domify(swig.render(template, {
      locals: { product: model.toJSON() }
    }));
  }
}

function bindToSubmit(element, model, view) {
  var form = element.querySelector('form')

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var attributes = {};
    lodash.forEach(form.elements, function(element) {
      if (element instanceof HTMLInputElement && element.checked) {
        attributes[element.name] = element.value;
      }
    });

    var quantity = element.querySelector('#quantity');

    model.order({
      attributes: attributes,
      quantity: quantity.value
    });
  });
}
