var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('../../../../../usr/views/store/sidebar/product.html');

function Product(model, element) {
    this.element = element || domify(template);

    bindToElement(this.element, model, this);
    bindToButtonClickEvent(this.element, model, this);

    events.EventEmitter.call(this);
}

util.inherits(Product, events.EventEmitter);

module.exports = Product;

function bindToElement(element, model, view) {
    if (element.dataset.id === model._id) return;

    element.dataset.id = model._id;
    element.querySelector('p')
        .innerText = model.description;
}

function bindToButtonClickEvent(element, model, view) {
    element.querySelector('button[name="add"]')
        .addEventListener('click', function(e) {
            view.emit('click:add', model, view);
        });
}
