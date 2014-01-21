var page   = require('page');
var domify = require('domify');
var lodash = require('lodash');

var template = require('views/store/order/index.html');

var OrderItem = require('./item');

function Order(model) {
  this.element = domify(template);

  bindToModelEvents(this.element, model, this);
  bindToSubmitEvents(this.element, model, this);
}

Order.prototype.push = function(item) {
  this.element.querySelector('ul')
  .appendChild(new OrderItem(item).element);

  return this;
};

Order.prototype.empty = function() {
  var element = this.element.querySelector('ul');

  while (element.lastElementChild) {
    element.lastElementChild.remove();
  }

  return this;
};

module.exports = Order;

function bindToModelEvents(element, model, view) {
  element = element.querySelector('ul');

  view.empty();

  model.get('items').on('push', function(item) {
    view.push(item);
  });
  model.get('items').forEach(function(item) {
    view.push(item);
  });
}

function bindToSubmitEvents(element, model, view) {
  element.querySelector('form')
  .addEventListener('submit', function(e) {
    e.preventDefault();

    page('/store/checkout');
  });
}
