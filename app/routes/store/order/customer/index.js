var swig   = require('swig');
var domify = require('domify');
var lodash = require('lodash');

var template = require('views/store/order/customer/index.html');

function Customer(element, model) {
  this.element = element.querySelector('#checkout');

  setupElement(this.element, model, this);
  listenToSubmitEvent(this.element, model, this);
}

Customer.prototype.disable = function() {
  this.element.querySelector('fieldset').setAttribute('disabled', true);

  return this;
};

module.exports = Customer;

function setupElement(element, model, view) {
  if (element) return;

  view.element = domify(swig.render(template, {
    locals: { customer: model.toJSON() }
  }));
}

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