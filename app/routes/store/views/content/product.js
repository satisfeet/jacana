var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('../../../../../usr/views/store/content/product.html');

function Product(model, element) {
    this.element = element || domify(template);
    
    bindToElement(this.element, model, this);
    bindToClickEvent(this.element, model, this);

    events.EventEmitter.call(this);
}

util.inherits(Product, events.EventEmitter);

module.exports = Product;

function bindToElement(element, model, view) {
    if (element.dataset.id === model._id) return;
    
    element.dataset.id = model._id;
    element.querySelector('h4').innerText = model.name;
    element.querySelector('img').src = model.image.path;
}

function bindToClickEvent(element, model, view) {
    element.addEventListener('click', function(e) {
        view.emit('click', model);
    });
}
