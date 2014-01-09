var util     = require('util');
var swig     = require('swig');
var domify   = require('domify');

var template = require('views/store/product/index.html');

function Product(model) {
    console.log(model.toJSON());

    this.element = domify(swig.render(template, {
        locals: { product: model.toJSON() }
    }));

    bindToSubmitEvents(this.element, model, this);
}

module.exports = Product;

function bindToSubmitEvents(element, model, view) {
    element = element.querySelector('form');
    
    element.addEventListener('submit', function(e) {
        e.preventDefault();

        var attributes = {};

        var elements = element.querySelectorAll('.form-group input:checked');
        [].slice.call(elements).forEach(function(element) {
            attributes[element.name] = element.value;
        });

        var quantity = element.querySelector('#quantity');

        model.emit('order', {
            attributes: attributes,
            quantity: quantity.value
        });
    });
}
