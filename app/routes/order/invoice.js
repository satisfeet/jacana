var swig   = require('swig');
var domify = require('domify');

var template = require('../../views/order/invoice');

function Invoice(element, model) {
  this.element = element.querySelector('#order-invoice');

  if (!this.element) {
    this.element = domify(swig.render(template));
  }
}

module.exports = Invoice;
