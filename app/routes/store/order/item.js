var swig   = require('swig');
var domify = require('domify');

var template = require('views/store/order/item.html');

function OrderItem(model) {
  this.element = domify(swig.render(template, {
    locals: { product: model.toJSON() }
  }));

  bindToClickEvent(this.element, model, this);
  bindToRemoveEvent(this.element, model, this);
}

module.exports = OrderItem;

function bindToClickEvent(element, model, view) {
  element = element.querySelector('button.close');

  element.addEventListener('click', function(e) {
    model.remove();
  });
}

function bindToRemoveEvent(element, model, view) {
  model.once('remove', function() {
    element.remove();
  });
}
