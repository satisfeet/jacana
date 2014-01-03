var util     = require('util');
var swig     = require('swig');
var domify   = require('domify');

var template = require('views/store/product/index.html');

function Product(model) {
    this.element = domify(swig.render(template, {
        locals: { product: model }
    }));

    bindToSubmitEvents(this.element, model, this);
}

module.exports = Product;

function bindToSubmitEvents(element, model, view) {
    element = element.querySelector('form');
    
    element.addEventListener('submit', function(e) {
        e.preventDefault();

        var size = element.querySelector('#sizes :checked');
        var color = element.querySelector('#colors :checked');
        var quantity = element.querySelector('#quantity');

        model.emit('order', {
            variation: {
                size: size.value,
                color: color.value,
            },
            quantity: quantity.value
        });
    });
}
