var Help        = require('./help');
var Order       = require('./order');
var Checkout    = require('./checkout');
var Product     = require('./product');
var ProductList = require('./product/list');

var template = require('views/store/content.html');

module.exports = function(app) {

  var help = new Help();
  var order = new Order(app.order);
  var checkout = new Checkout(app.order);
  var productList = new ProductList(app.products);

  app('/store', function(context, next) {
    insertLayout(context);
    insertContent(context, productList);
    insertSidebar(context, help);
  });

  app('/store/order', function(context, next) {
    insertLayout(context);
    insertContent(context, productList);
    insertSidebar(context, order);
  });

  app('/store/checkout', function(context, next) {
    insertLayout(context);
    insertContent(context, productList);
    insertSidebar(context, checkout);
  });

  app('/store/:product', function(context, next) {
    var product = context.products.find({
      _id: context.params.product
    });

    insertLayout(context);
    insertContent(context, productList);
    insertSidebar(context, new Product(product));

    productList.select(product);
  });

};

function insertLayout(context) {
  if (!context.element.querySelector('#store')) {
    context.element.innerHTML = template;
  }
}

function insertContent(context, view) {
  var element = context.element.querySelector('#content-inner');

  replace(element, view);
}

function insertSidebar(context, view) {
  var element = context.element.querySelector('#sidebar-inner');

  replace(element, view);
}

function replace(element, view) {
  if (element.contains(view.element)) return;

  while (element.lastElementChild) {
    element.lastElementChild.remove();
  }
  element.appendChild(view.element);
}
