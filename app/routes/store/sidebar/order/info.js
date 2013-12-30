var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('views/store/sidebar/order/info.html');

var ProductItem = require('./item');

function OrderInfo(element) {
    this.element = element || domify(template);

    bindToButtonClickEvent(this.element, this);

    events.EventEmitter.call(this);
}

util.inherits(OrderInfo, events.EventEmitter);

OrderInfo.prototype.show = function(order) {
    var element = this.element.querySelector('ul');

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }
 
    order.products.forEach(function(product) {
        var productItem = createProductItem(element, product, this);

        element.appendChild(productItem.element);
    }, this);

    return this;
};

module.exports = OrderInfo;

function createProductItem(element, model, view) {
    var productItem = new ProductItem().show(model);
 
    element.appendChild(productItem.element);

    productItem.on('click:remove', function() {
        view.emit('click:product:remove', model);
    });

    return productItem;
}

function bindToButtonClickEvent(element, view) {
    element.querySelector('button[name="submit"]')
        .addEventListener('click', function(e) {
            view.emit('click:submit');
        });
}
