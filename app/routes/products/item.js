var domify = require('domify');

var template = require('../../views/products/item');

function ProductItem(model) {
  this.element = domify(template({
    product: model.toJSON()
  }));

  listenToClickEvent(this.element, model, this);
}

module.exports = ProductItem;

function listenToClickEvent(element, model, view) {
  element.querySelector('button').addEventListener('click', function(e) {
    e.preventDefault();

    model.order();
  });
}
