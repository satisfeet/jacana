var domify   = require('domify');
var lodash   = require('lodash');

var template = require('views/store/product/list.html');

var ProductItem = require('./item');

function ProductList(collection) {
    this.element = domify(template);

    bindToCollectionEvents(this.element, collection, this);
}

ProductList.prototype.list = function(models) {
    this.empty();

    models.forEach(function(model) {
        this.push(model);
    }, this);

    return this;
};

ProductList.prototype.push = function(model) {
    this.element.appendChild(new ProductItem(model).element);

    return this;
};

ProductList.prototype.select = function(model) {
    var elements = [].slice.call(this.element.children);

    elements.forEach(function(element) {
        if (element.id === model._id) {
            element.classList.add('selected')
        } else {
            element.classList.remove('selected');
        }
    });

    return this;
};

ProductList.prototype.empty = function() {
    while (this.element.lastElementChild) {
        this.element.lastElementChild.remove();
    }

    return this;
};

module.exports = ProductList;

function bindToCollectionEvents(element, collection, view) {
    collection.on('push', function(model) {
        view.push(model);
    });

    view.list(collection.models);
}
