var domify = require('domify');

var template = require('views/store/sidebar/order/list.html');

var OrderItem = require('./item');

function OrderList(models, element) {
    this.element = element || domify(template);
}

OrderList.prototype.list = function(orders) {
    var element = this.element;

    orders.forEach(function(order) {
        createOrderItem(element, order, this);
    }, this);

    return this;
};

OrderList.prototype.empty = function() {
    var element = this.element;

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }

    return this;
};

module.exports = OrderList;

function createOrderItem(element, model, view) {
    var orderItem = new OrderItem().show(model);
        
    element.appendChild(orderItem.element);
}
