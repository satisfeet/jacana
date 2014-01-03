var swig   = require('swig');
var domify = require('domify');

var template = require('views/store/checkout/index.html');

function Checkout(model) {
    this.element = domify(swig.render(template, {
        locals: { order: model }
    }));

    bindToSubmitEvents(this.element, model, this);
}

module.exports = Checkout;

function bindToSubmitEvents(element, model, view) {
    element = element.querySelector('form');

    var name = element.querySelector('#name');
    var email = element.querySelector('#email');
    var street = element.querySelector('#street');
    var zipcode = element.querySelector('#zipcode');

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
