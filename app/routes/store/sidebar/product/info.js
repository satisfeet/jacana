var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('views/store/sidebar/product/info.html');

function ProductInfoView(element) {
    this.element = element || domify(template);

    bindToButtonClickEvent(this.element, this);

    events.EventEmitter.call(this);
}

util.inherits(ProductInfoView, events.EventEmitter);

ProductInfoView.prototype.show = function(product) {
    this.model = product;

    if (this.element.dataset.id !== product._id) {
        this.element.dataset.id = product._id;
        this.element.querySelector('p').innerText = product.description;
    }

    buildSizeFormGroup(this.element, product, this);
    buildColorFormGroup(this.element, product, this);

    return this;
};

module.exports = ProductInfoView;

function bindToButtonClickEvent(element, view) {
    element.querySelector('button[name="push"]')
        .addEventListener('click', function(e) {
            var size = element.querySelector('input[name="size"]:checked').value;
            var color = element.querySelector('input[name="color"]:checked').value;

            view.emit('push', view.model, {
                size: size,
                color: color
            });
        });
}

function buildSizeFormGroup(element, model, view) {
    element = element.querySelector('#sizes');

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }

    model.variations.sizes.forEach(function(size) {
        var label = document.createElement('label');
        var input = document.createElement('input');
        var info = document.createElement('span');
 
        info.innerText = size;

        input.name = 'size';
        input.type = 'radio';
        input.value = size;

        label.classList.add('radio-inline');
        
        label.appendChild(input);
        label.appendChild(info);
    
        element.appendChild(label);
    });
}

function buildColorFormGroup(element, model, view) {
    element = element.querySelector('#colors');

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }

    model.variations.colors.forEach(function(color) {
        var label = document.createElement('label');
        var input = document.createElement('input');
        var info = document.createElement('span');
 
        info.innerText = color;
        
        input.name = 'color';
        input.type = 'radio';
        input.value = color;

        label.classList.add('radio-inline');
        
        label.appendChild(input);
        label.appendChild(info);
    
        element.appendChild(label);
    });
}
