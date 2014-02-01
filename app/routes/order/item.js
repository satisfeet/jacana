var swig   = require('swig');
var domify = require('domify');

var template = require('../../../var/views/app/order/item.html');

function Item(model) {
  this.element = domify(swig.render(template, {
    locals: { item: model.toJSON() }
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
