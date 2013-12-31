var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('views/store/content/product/list.html');

var ProductItemView = require('./item');

function ProductListView(element) {
    this.element = element || domify(template);

    events.EventEmitter.call(this);
}

util.inherits(ProductListView, events.EventEmitter);

ProductListView.prototype.list = function(products) {
    var elements = [].slice.call(this.element.children);
 
    products.forEach(function(product) {
        var element = elements.filter(function(element) {
            if (element.dataset.id === product._id) return element;
        }).shift();

        createProductItemView(element, product, this);
    }, this);

    return this;
};

ProductListView.prototype.select = function(product) {
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

module.exports = ProductListView;

function createProductItemView(element, model, view) {
    var productItemView = new ProductItemView(element);

    productItemView.on('show', function(id) {
        view.emit('show', model, id);
    });
    productItemView.show(model);

    if (!element) {
        view.element.appendChild(productItemView.element);
    }
}
