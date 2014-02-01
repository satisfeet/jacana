var swig   = require('swig');
var domify = require('domify');
var lodash = require('lodash');

var template = require('../../views/order/customer.html');

function Customer(element, model) {
  this.element = element.querySelector('#checkout');

  if (!this.element) {
    this.element = domify(swig.render(template, {
      locals: { customer: model.toJSON() }
    }));
  }

  listenToSubmitEvent(this.element, model, this);
}

Customer.prototype.disable = function() {
  this.element.querySelector('fieldset').setAttribute('disabled', true);

  return this;
};

module.exports = Customer;

function listenToSubmitEvent(element, model, view) {
  var form = element.querySelector('form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    lodash.forEach(form.elements, function(element) {
      if (!(element instanceof HTMLInputElement)) return;

      if (element.name.indexOf('address')) {
        model.set(element.name, element.value);
      } else {
        model.setAddress(element.name.replace('address-', ''), element.value);
      }
    });

    model.submit();

    view.disable();
  });
}
