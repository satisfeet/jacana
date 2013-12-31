var domify   = require('domify');
var reactive = require('reactive');

var template = require('views/store/product/item.html');

function ProductItem(model) {
    this.element = domify(template);
    this.model = model;

    reactive(this.element, this.model, this);
}

ProductItem.prototype.href = function() {
    return '/store/' + this.model._id;
};

ProductItem.prototype.imageSrc = function() {
    return this.model.image.path;
};

module.exports = ProductItem;
