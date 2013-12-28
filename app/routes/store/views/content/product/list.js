var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('../../../../../../usr/views/store/content/product/list.html');

var ProductItem = require('./item');

function ProductList(element) {
    this.element = element || domify(template);

    events.EventEmitter.call(this);
}

util.inherits(ProductList, events.EventEmitter);

ProductList.prototype.list = function(products) {
    var elements = [].slice.call(this.element.children);
    
    products.forEach(function(product) {
        var element = elements.filter(function(element) {
            if (element.dataset.id === product._id) return element;
        }).shift();

        createProductItem(element, product, this);
    }, this);

    return this;
};

ProductList.prototype.select = function(product) {
    var elements = [].slice.call(this.element.children);

    elements.forEach(function(element) {
        if (element.dataset.id === product._id) {
            element.classList.add('selected')
        } else {
            element.classList.remove('selected');
        }
    });

    return this;
};

module.exports = ProductList;

function createProductItem(element, model, view) {
    var productItem = new ProductItem(element).show(model);

    productItem.on('click', function() {
        view.emit('click:product', model);
    });

    if (!element) {
       view.element.appendChild(productItem.element);
    }
}
