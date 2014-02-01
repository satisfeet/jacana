var swig   = require('swig');
var domify = require('domify');

var template = require('../../views/order/payment');

function Payment(element, model) {
  this.element = element.querySelector('#order-payment');

  if (!this.element) {
    this.element = domify(swig.render(template));
  }
}

module.exports = Payment;
