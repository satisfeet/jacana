var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('views/store/content/product/item.html');

function ProductItem(element) {
    this.element = element || domify(template);
    
    bindToClickEvent(this.element, this);

    events.EventEmitter.call(this);
}

util.inherits(ProductItem, events.EventEmitter);

ProductItem.prototype.show = function(product) {
    if (this.element.dataset.id !== product._id) {
        this.element.dataset.id = product._id;
        this.element.querySelector('h4').innerText = product.name;
        this.element.querySelector('img').src = product.image.path;
    }

    return this;
};

module.exports = ProductItem;

function bindToClickEvent(element, view) {
    element.addEventListener('click', function(e) {
        view.emit('click', element.dataset.id);
    });
}
