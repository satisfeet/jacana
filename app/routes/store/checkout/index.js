var swig   = require('swig');
var domify = require('domify');

var template = require('views/store/checkout/index.html');

function Checkout(model) {
    this.element = domify(swig.render(template, {
        locals: { order: model }
    }));

    bindToSubmitEvents(this.element, model, this);
}

Checkout.prototype.lock = function() {
    this.element.querySelector('fieldset')
        .setAttribute('disabled', true);

    return this;
};

module.exports = Checkout;

function bindToSubmitEvents(element, model, view) {
    var form = element.querySelector('form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        model.get('customer')
            .set('name', form.elements['name'].value)
            .set('email', form.elements['email'].value)
            .setAddress('place', form.elements['place'].value)
            .setAddress('street', form.elements['street'].value)
            .setAddress('streetNr', form.elements['street-nr'].value)
            .setAddress('zipCode', form.elements['zip-code'].value)
            ;

        model.submit();

        view.lock();
    });
}
