var swig   = require('swig');
var domify = require('domify');

var template = require('views/store/order/item.html');

function OrderItem(model) {
  this.element = domify(swig.render(template, {
    locals: { product: model.toJSON() }
  }));

  bindToClickEvents(this.element, model, this);
}

OrderItem.prototype.remove = function() {
  this.element.remove();
};

module.exports = OrderItem;

function bindToClickEvents(element, model, view) {
  element = element.querySelector('button.close');

  element.addEventListener('click', function(e) {
    model.remove();
    view.remove();
  });
}
