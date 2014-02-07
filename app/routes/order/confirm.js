var page   = require('page');
var domify = require('domify');

var template = require('../../views/order/confirm');

function Confirm(element, model) {
  this.element = domify(template({
    order: model.toJSON()
  }));

  listenToSubmitEvent(this.element, model, this);
}

module.exports = Confirm;

function listenToSubmitEvent(element, model, view) {
  element.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    model.submit();
    model.clear();

    page('/order/goodbye');
  });
}
