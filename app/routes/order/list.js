var domify = require('domify');
var lodash = require('lodash');

var template = require('../../views/order/list');

var Item = require('./item');

function ItemList(element, model) {
  this.element = domify(template({
    order: model.toJSON()
  }));

  listenToPushEvent(this.element, model, this);
  listenToChangeEvent(this.element, model, this);
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

ItemList.prototype.setTotal = function(value) {
  this.element.querySelector('#total').innerText = value;

  return this;
};

module.exports = ItemList;

function listenToPushEvent(element, model, view) {
  view.empty();

  model.get('items').on('push', function(item) {
    view.push(item);
  }).forEach(function(item) {
    view.push(item);
  });
}

function listenToChangeEvent(element, model, view) {
  model.get('items').on('change', function() {
    if (model.get('items').length < 1) {
      element.querySelector('a.btn').remove();
    }
  });
  model.get('pricing').on('change:retail', function(value) {
    view.setTotal(value);
  });
  view.setTotal(model.get('pricing').get('retail'));
}
