var page   = require('page');
var swig   = require('swig');
var domify = require('domify');

var template = require('../../views/order/confirm');

function Confirm(element, model) {
  this.element = element.querySelector('#order-confirm');

  if (!this.element) {
    this.element = domify(swig.render(template));
  }

  listenToSubmitEvent(this.element, model, this);
}

module.exports = Confirm;

function listenToSubmitEvent(element, model, view) {
  element.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    page('/order/goodbye');
  });
}
