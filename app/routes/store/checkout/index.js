var domify   = require('domify');
var reactive = require('reactive');

var template = require('views/store/checkout/index.html');

function Checkout(model) {
    this.element = domify(template);

    bindToSubmitEvents(this.element, model, this);
}

module.exports = Checkout;

function bindToSubmitEvents(element, model, view) {
    element = element.querySelector('form');

    var name = element.querySelector('input[name="name"]');
    var email = element.querySelector('input[name="email"]');
    var street = element.querySelector('input[name="street"]');
    var zipcode = element.querySelector('input[name="zipcode"]');

    element.addEventListener('submit', function(e) {
        e.preventDefault();

        model.customer.name = name.value;
        model.customer.email = email.value;
        model.customer.address = {
            street: street.value,
            zipcode: parseInt(zipcode.value)
        };

        model.emit('checkout');
    });
}
