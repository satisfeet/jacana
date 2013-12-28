var domify = require('domify');

var template = require('../../../../../../usr/views/store/sidebar/order/item.html');

function OrderItem(element) {
    this.element = element || domify(template);
}

OrderItem.prototype.show = function(order) {
    if (this.element.dataset.id !== order._id) {
        this.element.dataset.id = order._id;
        this.element.querySelector('h5').innerText = order.name;
    }

    return this;
};

module.exports = OrderItem;
