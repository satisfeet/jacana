var util   = require('util');
var domify = require('domify');
var lodash = require('lodash');

var template = require('../../views/products/info');

function Product(element, model) {
  this.element = element.querySelector('#product-info');

  if (!this.element || this.element.dataset.id !== model.get('_id')) {
    this.element = domify(template({
      product: model.toJSON()
    }));
  }

  listenToSubmitEvent(this.element, model, this);
}

module.exports = Product;

function listenToSubmitEvent(element, model, view) {
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
