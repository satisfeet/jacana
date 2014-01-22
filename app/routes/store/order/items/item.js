var swig   = require('swig');
var domify = require('domify');

var template = require('views/store/order/items/item.html');

function Item(model) {
  setupElement(this.element, model, this);
  listenToClickEvent(this.element, model, this);
  listenToRemoveEvent(this.element, model, this);
}

module.exports = Item;

function setupElement(element, model, view) {
  view.element = domify(swig.render(template, {
    locals: { item: model.toJSON() }
  }));
}

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
