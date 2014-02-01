var swig   = require('swig');
var domify = require('domify');

var template = require('../../views/order/shipment');

function Shipment(element, model) {
  this.element = element.querySelector('#order-shipment');

  if (!this.element) {
    this.element = domify(swig.render(template));
  }
}

module.exports = Shipment;
