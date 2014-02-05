var domify = require('domify');

var template = require('../../views/products/item');

function ProductItem(model) {
  this.element = domify(template({
    product: model.toJSON()
  }));
}

module.exports = ProductItem;
