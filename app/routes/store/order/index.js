var domify = require('domify');
var lodash = require('lodash');

var template = require('views/store/order/index.html');

var ProductItem = require('./item');

function OrderInfo(model) {
    this.element = domify(template);

    bindToModelEvents(this.element, model, this);
    bindToSubmitEvents(this.element, model, this);
}

OrderInfo.prototype.list = function(products) {
    this.empty();

    products.forEach(function(product) {
        this.push(product);
    }, this);

    return this;
};

OrderInfo.prototype.push = function(product) {
    this.element.querySelector('ul')
        .appendChild(new ProductItem(product).element);

    return this;
};

OrderInfo.prototype.remove = function(product) {
    var element = this.element.querySelector('ul');
    
    lodash.forEach(element.children, function(element) {
        if (element.id === product._id) {
            element.remove();
        }
    });

    return this;
};

OrderInfo.prototype.empty = function() {
    var element = this.element.querySelector('ul');

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }

    return this;
};

module.exports = OrderInfo;

function bindToModelEvents(element, model, view) {
    element = element.querySelector('ul');
 
    model.on('push', function(product) {
        view.push(product);
    });
    model.on('remove', function(product) {
        view.remove(product);
    });

    view.list(model.products);
}

function bindToSubmitEvents(element, model, view) {
    element.querySelector('form')
        .addEventListener('submit', function(e) {
            e.preventDefault();
        });
}
