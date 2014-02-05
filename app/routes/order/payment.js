var page   = require('page');
var domify = require('domify');

var template = require('../../views/order/payment');

function Payment(element, model) {
  this.element = element.querySelector('#order-payment');

  if (!this.element) {
    this.element = domify(template());
  }

  listenToSubmitEvent(this.element, model, this);
}

module.exports = Payment;

function listenToSubmitEvent(element, model, view) {
  element.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    page('/order/shipment');
  });
}
