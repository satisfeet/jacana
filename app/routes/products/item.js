var swig     = require('swig');
var domify   = require('domify');

var template = require('views/products/item.html');

function ProductItem(model) {
  this.element = domify(swig.render(template, {
    locals: { product: model.toJSON() }
  }));
}

module.exports = ProductItem;
