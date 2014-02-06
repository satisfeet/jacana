var page   = require('page');
var domify = require('domify');
var lodash = require('lodash');

var template = require('../../views/order/payment');

function Payment(element, model) {
  this.element = element.querySelector('#order-payment');

  if (!this.element) {
    this.element = domify(template({
      order: model.toJSON()
    }));
  } else {
    var elements = this.element.querySelectorAll('input');

    lodash.forEach(elements, function(element) {
      var key = element.name.split('-').join('.');

      element.value = model.get('payment').get(key);
    });
  }

  listenToSubmitEvent(this.element, model, this);
}

module.exports = Payment;

function listenToSubmitEvent(element, model, view) {
  element.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    lodash.forEach(e.target.elements, function(element) {
      if (element instanceof HTMLInputElement) {
        var key = element.name.split('-').join('.');

        model.get('payment').set(key, element.value);
        model.get('shipment').set(key, element.value);
      }
    });

    page('/order/shipment');
  });
}
