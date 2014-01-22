var util   = require('util');
var swig   = require('swig');
var domify = require('domify');
var lodash = require('lodash');

var template = require('views/store/product/index.html');

function Product(element, model) {
  this.element = element.querySelector('#product-info');

  setup(this.element, model, this);
  submit(this.element, model, this);
}

module.exports = Product;

function setup(element, model, view) {
  // render template if this is the wrong product id
  if (!view.element || view.element.dataset.id !== model.get('_id')) {
    view.element = domify(swig.render(template, {
      locals: { product: model.toJSON() }
    }));
  }
}

function submit(element, model, view) {
  var form = element.querySelector('form')

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var attributes = {};

    // TODO: lodash.forEach(form.elements)
    var elements = element.querySelectorAll('input:checked');
    lodash.forEach(elements, function(element) {
      attributes[element.name] = element.value;
    });

    var quantity = element.querySelector('#quantity');

    model.order({
      attributes: attributes,
      quantity: quantity.value
    });
  });
}
