var util     = require('util');
var domify   = require('domify');
var reactive = require('reactive');

var template = require('views/store/product/index.html');

function Product(model) {
    this.element = domify(template);

    bindToSubmitEvents(this.element, model, this);
    
    buildSizeFormGroup(this.element, model, this);
    buildColorFormGroup(this.element, model, this);

    reactive(this.element, model, this);
}

module.exports = Product;

function bindToSubmitEvents(element, model, view) {
    element = element.querySelector('form');
    
    element.addEventListener('submit', function(e) {
        e.preventDefault();

        var size = element.querySelector('input[name="size"]:checked');
        var color = element.querySelector('input[name="color"]:checked');
        var quantity = element.querySelector('input[name="quantity"]');

        model.emit('order', {
            size: size.value,
            color: color.value,
            quantity: quantity.value
        });
    });
}

function buildSizeFormGroup(element, model, view) {
    element = element.querySelector('#sizes');

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }

    model.variations.sizes.forEach(function(size) {
        var template = '';
        template += '<label class="radio-inline">';
        template += '<input type="radio" name="size" value="%s" data-value="variations.size" />';
        template += '%s';
        template += '</label>';
    
        element.appendChild(domify(util.format(template, size, size)));
    });
}

function buildColorFormGroup(element, model, view) {
    element = element.querySelector('#colors');

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }

    model.variations.colors.forEach(function(color) {
        var template = '';
        template += '<label class="radio-inline">';
        template += '<input type="radio" name="color" value="%s" />';
        template += '%s';
        template += '</label>';
    
        element.appendChild(domify(util.format(template, color, color)));
    });
}
