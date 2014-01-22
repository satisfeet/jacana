var swig   = require('swig');
var domify = require('domify');

var template = require('views/store/checkout/index.html');

function Checkout(element, model) {
  this.element = element.querySelector('#checkout') || domify(swig.render(template, {
    locals: { order: model.toJSON() }
  }));

  bindToSubmitEvents(this.element, model, this);
}

Checkout.prototype.disable = function() {
  this.element.querySelector('fieldset').setAttribute('disabled', true);

  return this;
};

module.exports = Checkout;

function bindToSubmitEvents(element, model, view) {
  var form = element.querySelector('form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // TODO: iterate over form.elements
    model.get('customer')
      .set('name', form.elements['name'].value)
      .set('email', form.elements['email'].value)
      .setAddress('place', form.elements['place'].value)
      .setAddress('street', form.elements['street'].value)
      .setAddress('streetNr', form.elements['street-nr'].value)
      .setAddress('zipCode', form.elements['zip-code'].value)
      ;

    model.submit();

    view.disable();
  });
}
