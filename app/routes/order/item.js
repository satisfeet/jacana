var domify = require('domify');

var template = require('../../views/order/item');

function Item(model) {
  this.element = domify(template({
    item: model.toJSON()
  }));

  listenToClickEvent(this.element, model, this);
  listenToRemoveEvent(this.element, model, this);
}

module.exports = Item;

function listenToClickEvent(element, model, view) {
  element.querySelector('.close').addEventListener('click', function(e) {
    model.remove();
  });
}

function listenToRemoveEvent(element, model, view) {
  model.once('remove', function() {
    element.remove();
  });
}
