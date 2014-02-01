var swig   = require('swig');
var domify = require('domify');
var lodash = require('lodash');

var template = require('../../../var/views/app/products/list.html');

var ProductItem = require('./item');

function ProductList(element, collection) {
  this.element = element.querySelector('#product-list');

  if (!this.element) {
    this.element = domify(swig.render(template));
  }

  listenToCollectionEvents(this.element, collection, this);
}

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

function listenToCollectionEvents(element, collection, view) {
  view.empty();

  collection.on('push', function(model) {
    view.push(model);
  }).forEach(function(model) {
    view.push(model);
  });
}
