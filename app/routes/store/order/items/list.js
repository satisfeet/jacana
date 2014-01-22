var page   = require('page');
var domify = require('domify');
var lodash = require('lodash');

var template = require('views/store/order/items/list.html');

var Item = require('./item');

function ItemList(element, model) {
  this.element = element.querySelector('#order-list');

  setupElement(this.element, model, this);
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

function setupElement(element, model, view) {
  if (!element) view.element = domify(template);
}

function listenToModelEvent(element, model, view) {
  view.empty();

  model.on('push', function(item) {
    view.push(item);
  }).forEach(function(item) {
    view.push(item);
  });
}
