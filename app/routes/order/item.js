var domify = require('domify');

var template = require('../../views/order/item');

function Item(model) {
  this.element = domify(template({
    item: model.toJSON()
  }));

  listenToClickEvent(this.element, model, this);
  listenToChangeEvent(this.element, model, this);
  listenToRemoveEvent(this.element, model, this);
}

module.exports = Item;

function listenToClickEvent(element, model, view) {
  element.querySelector('.close').addEventListener('click', function(e) {
    model.remove();
  });
}

function listenToChangeEvent(element, model, view) {
  element.querySelector('form').addEventListener('change', function(e) {
    model.set(e.target.name, e.target.value);
  });
}

function listenToRemoveEvent(element, model, view) {
  model.once('remove', function() {
    element.remove();
  });
}
