var util   = require('util');
var domify = require('domify');
var lodash = require('lodash');

var template = require('../../views/products/show');

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
  element.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    var order = {};
    lodash.forEach(e.target.elements, function(element) {
      if (element instanceof HTMLInputElement) {
        order[element.name.split('-').join('.')] = element.value;
      }
    });

    model.order(order);
  });
}
