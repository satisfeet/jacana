var Help        = require('./help');
var Order       = require('./order');
var Checkout    = require('./checkout');
var ProductInfo = require('./product');
var ProductList = require('./product/list');

var template = require('views/store/content.html');

module.exports = function(app) {

  app('/store', function(context, next) {
    createHelp(context);
    createProductList(context);
  });

  app('/store/order', function(context, next) {
    createOrder(context);
    createProductList(context);
  });

  app('/store/checkout', function(context, next) {
    createCheckout(context);
    createProductList(context);
  });

  app('/store/:product', function(context, next) {
    context.product = context.products.find({
      _id: context.params.product
    });

    createProductInfo(context);
    createProductList(context).select(context.product);
  });

};

function createHelp(context) {
  var view = new Help(context.element);

  return replace(context.element, '#sidebar-inner', view);
}

function createOrder(context) {
  var view = new Order(context.element, context.order);

  return replace(context.element, '#sidebar-inner', view);
}

function createCheckout(context) {
  var view = new Checkout(context.element, context.order);

  return replace(context.element, '#sidebar-inner', view);
}

function createProductInfo(context) {
  var view = new ProductInfo(context.element, context.product);

  return replace(context.element, '#sidebar-inner', view);
}

function createProductList(context) {
  var view = new ProductList(context.element, context.products);

  return replace(context.element, '#content-inner', view);
}

function replace(element, selector, view) {
  // will insert layout template if not present
  if (!element.querySelector('#store')) {
    element.innerHTML = template;
  }
  // will insert view element into selector if not present
  if (!element.contains(view.element)) {
    element = element.querySelector(selector);
    while (element.lastElementChild) {
      element.lastElementChild.remove();
    }
    element.appendChild(view.element);
  }
  // make function chainable
  return view;
}
