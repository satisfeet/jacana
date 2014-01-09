var page   = require('page');
var domify = require('domify');
var lodash = require('lodash');

var template = require('views/store/order/index.html');

var ProductItem = require('./item');

function Order(model) {
    this.element = domify(template);

    bindToModelEvents(this.element, model, this);
    bindToSubmitEvents(this.element, model, this);
}

Order.prototype.list = function(products) {
    this.empty();

    products.forEach(function(product) {
        this.push(product);
    }, this);

    return this;
};

Order.prototype.push = function(product) {
    this.element.querySelector('ul')
        .appendChild(new ProductItem(product).element);

    return this;
};

Order.prototype.empty = function() {
    var element = this.element.querySelector('ul');

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }

    return this;
};

module.exports = Order;

function bindToModelEvents(element, model, view) {
    element = element.querySelector('ul');
 
    model.on('push', function(product) {
        view.push(product);
    });

    view.list(model.attributes.products);
}

function bindToSubmitEvents(element, model, view) {
    element.querySelector('form')
        .addEventListener('submit', function(e) {
            e.preventDefault();

            page('/store/checkout');
        });
}
