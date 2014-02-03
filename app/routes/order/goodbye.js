var swig   = require('swig');
var domify = require('domify');

var template = require('../../views/order/goodbye');

function Goodbye(element, model) {
  this.element = element.querySelector('#order-goodbye');

  if (!this.element) {
    this.element = domify(swig.render(template));
  }
}

module.exports = Goodbye;
