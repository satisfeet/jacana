var swig   = require('swig');
var domify = require('domify');

var template = require('../../views/order/confirm');

function Confirm(element, model) {
  this.element = element.querySelector('#order-confirm');

  if (!this.element) {
    this.element = domify(swig.render(template));
  }
}

module.exports = Confirm;
