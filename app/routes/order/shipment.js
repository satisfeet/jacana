var page   = require('page');
var domify = require('domify');

var template = require('../../views/order/shipment');

function Shipment(element, model) {
  this.element = element.querySelector('#order-shipment');

  if (!this.element) {
    this.element = domify(template());
  }

  listenToSubmitEvent(this.element, model, this);
}

module.exports = Shipment;

function listenToSubmitEvent(element, model, view) {
  element.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    page('/order/payment');
  });
}
