var swig     = require('swig');
var domify   = require('domify');

var template = require('views/store/product/item.html');

function ProductItem(model) {
    this.element = domify(swig.render(template, {
        locals: { product: model }   
    }));
}

module.exports = ProductItem;
