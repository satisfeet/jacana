var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('views/store/sidebar/order/info.html');

var ProductItemView = require('./item');

function OrderInfoView(element) {
    this.element = element || domify(template);

    bindToButtonClickEvent(this.element, this);

    events.EventEmitter.call(this);
}

util.inherits(OrderInfoView, events.EventEmitter);

OrderInfoView.prototype.show = function(order) {
    var element = this.element.querySelector('ul');

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }
 
    order.products.forEach(function(product) {
        var productItemView = createProductItemView(element, product, this);

        element.appendChild(productItemView.element);
    }, this);

    return this;
};

module.exports = OrderInfoView;

function createProductItemView(element, model, view) {
    var productItemView = new ProductItemView().show(model);
 
    element.appendChild(productItemView.element);

    productItemView.on('click:remove', function() {
        view.emit('click:product:remove', model);
    });

    return productItemView;
}

function bindToButtonClickEvent(element, view) {
    element.querySelector('button[name="submit"]')
        .addEventListener('click', function(e) {
            view.emit('click:submit');
        });
}
