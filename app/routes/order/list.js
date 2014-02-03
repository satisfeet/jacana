var domify = require('domify');
var lodash = require('lodash');

var template = require('../../views/order/list');

var Item = require('./item');

function ItemList(element, model) {
  this.element = element.querySelector('#order-list');

  if (!this.element) {
    this.element = domify(template());
  }

  listenToModelEvent(this.element, model, this);
}

ItemList.prototype.push = function(item) {
  this.element.firstElementChild.appendChild(new Item(item).element);

  return this;
};

ItemList.prototype.empty = function() {
  while (this.element.firstElementChild.lastElementChild) {
    this.element.firstElementChild.lastElementChild.remove();
  }

  return this;
};

module.exports = ItemList;

function listenToModelEvent(element, model, view) {
  view.empty();

  model.on('push', function(item) {
    view.push(item);
  }).forEach(function(item) {
    view.push(item);
  });
}
