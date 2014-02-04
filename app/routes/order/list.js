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
  var element = this.element.querySelector('ul');

  element.appendChild(new Item(item).element);

  return this;
};

ItemList.prototype.empty = function() {
  var element = this.element.querySelector('ul');

  while (element.lastElementChild) {
    element.lastElementChild.remove();
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
