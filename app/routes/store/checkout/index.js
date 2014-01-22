var swig   = require('swig');
var domify = require('domify');
var lodash = require('lodash');

var template = require('views/store/checkout/index.html');

function Checkout(element, model) {
  this.element = element.querySelector('#checkout');

  setupElement(this.element, model, this);
  bindToSubmit(this.element, model, this);
}

Checkout.prototype.disable = function() {
  this.element.querySelector('fieldset').setAttribute('disabled', true);

  return this;
};

module.exports = Checkout;

function setupElement(element, model, view) {
  if (element) return;

  view.element = domify(swig.render(template, {
    locals: { customer: model.get('customer').toJSON() }
  }));
}

function bindToSubmit(element, model, view) {
  var form = element.querySelector('form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var customer = model.get('customer');
    lodash.forEach(form.elements, function(element) {
      if (!(element instanceof HTMLInputElement)) return;

      if (element.name.indexOf('address')) {
        customer.set(element.name, element.value);
      } else {
        customer.setAddress(element.name.replace('address-', ''), element.value);
      }
    });

    model.submit();
    view.disable();
  });
}
