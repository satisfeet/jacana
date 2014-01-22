var domify   = require('domify');
var lodash   = require('lodash');

var template = require('views/store/product/list.html');

var ProductItem = require('./item');

function ProductList(element, collection) {
  this.element = element.querySelector('#product-list') || domify(template);

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
  lodash.forEach(this.element.children, function(element) {
    if (element.id === model.get('_id')) {
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
