var util   = require('util');
var events = require('events');
var domify = require('domify');

var template = require('views/store/sidebar/order/checkout.html');

function OrderCheckoutView(element) {
    this.element = element || domify(template);

    bindToSubmitEvent(this.element, this);

    events.EventEmitter.call(this);
}

util.inherits(OrderCheckoutView, events.EventEmitter);

OrderCheckoutView.prototype.show = function(order) {
    
};

module.exports = OrderCheckoutView;

function bindToSubmitEvent(element, view) {
    element.querySelector('form')
        .addEventListener('submit', function(e) {
            e.preventDefault();

            var customer = {};
            customer.name = element.querySelector('input[name="name"]').value;
            customer.email = element.querySelector('input[name="email"]').value;
            customer.address = {};
            customer.address.street = element.querySelector('input[name="address-street"]').value;
            customer.address.code = element.querySelector('input[name="address-code"]').value;

            view.emit('submit', customer);
        });
}
