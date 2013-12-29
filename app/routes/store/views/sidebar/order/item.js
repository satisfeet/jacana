var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('views/store/sidebar/order/item.html');

function OrderItem(element) {
    this.element = element || domify(template);

    bindToButtonClickEvent(this.element, this);

    events.EventEmitter.call(this);
}

util.inherits(OrderItem, events.EventEmitter);

OrderItem.prototype.show = function(order) {
    if (this.element.dataset.id !== order._id) {
        this.element.dataset.id = order._id;
        this.element.querySelector('h5').innerText = order.name;
    }

    return this;
};

module.exports = OrderItem;

function bindToButtonClickEvent(element, view) {
    element.querySelector('button[name="remove"]')
        .addEventListener('click', function(e) {
            view.emit('click:remove');
        });
}
