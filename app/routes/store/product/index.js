var util   = require('util');
var swig   = require('swig');
var domify = require('domify');
var lodash = require('lodash');

var template = require('views/store/product/index.html');

function Product(model) {
    this.element = domify(swig.render(template, {
        locals: { product: model.toJSON() }
    }));

    bindToSubmitEvents(this.element, model, this);
}

module.exports = Product;

function bindToSubmitEvents(element, model, view) {
    element.querySelector('form')
        .addEventListener('submit', function(e) {
            e.preventDefault();

            var attributes = {};

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
