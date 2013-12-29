var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('views/store/sidebar/order/list.html');

var OrderItem = require('./item');

function OrderList(element) {
    this.element = element || domify(template);

    bindToButtonClickEvent(this.element, this);

    events.EventEmitter.call(this);
}

util.inherits(OrderList, events.EventEmitter);

OrderList.prototype.list = function(orders) {
    var element = this.element.querySelector('ul');;

    orders.forEach(function(order) {
        createOrderItem(element, order, this);
    }, this);

    return this;
};

OrderList.prototype.remove = function(order) {
    var element = this.element.querySelector('ul');

    [].slice.call(element.children).forEach(function(element) {
        if (element.dataset.id === order._id) {
            element.remove();
        }
    });

    return this;
};

OrderList.prototype.empty = function() {
    var element = this.element.querySelector('ul');

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }

    return this;
};

module.exports = OrderList;

function createOrderItem(element, model, view) {
    var orderItem = new OrderItem().show(model);
 
    element.appendChild(orderItem.element);

    orderItem.on('click:remove', function() {
        view.emit('click:remove', model);
    });
}

function bindToButtonClickEvent(element, view) {
    element.querySelector('button[name="submit"]')
        .addEventListener('click', function(e) {
            view.emit('click:submit');
        });
}
