var page   = require('page');
var domify = require('domify');

var template = require('../../views/order/goodbye');

function Goodbye(element, model) {
  this.element = element.querySelector('#order-goodbye');

  if (!this.element) {
    this.element = domify(template());
  }

  listenToSubmitEvent(this.element, model, this);
}

module.exports = Goodbye;

function listenToSubmitEvent(element, model, view) {
  var checkbox = element.querySelector('input');

  element.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!checkbox.checked) {
      model.remove();
    }

    page('/');
  });
}
