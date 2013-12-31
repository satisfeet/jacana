var HelpInfo    = require('./help/index');
var OrderInfo   = require('./order/index');
var ProductInfo = require('./product/index');
var ProductList = require('./product/list');

var template = require('views/store/layout.html');

module.exports = function(app) {

    var helpInfo = new HelpInfo();
    var orderInfo = new OrderInfo(app.order);
    var productList = new ProductList(app.products);

    app('/store', function(context, next) {
        insertLayout(context);
        insertContent(context, productList);
        insertSidebar(context, helpInfo);
    });

    app('/store/order', function(context, next) {
        insertLayout(context);
        insertContent(context, productList);
        insertSidebar(context, orderInfo);
    });

    app('/store/:product', function(context, next) {
        var product = context.products.find(context.params.product);

        insertLayout(context);
        insertContent(context, productList);
        insertSidebar(context, new ProductInfo(product));

        productList.select(product);
    });

};

function insertLayout(context) {
    if (!context.query('#store')) {
        context.element.innerHTML = template;
    }
}

function insertContent(context, view) {
    var element = context.query('#content-inner');

    replace(element, view);
}

function insertSidebar(context, view) {
    var element = context.query('#sidebar-inner');
    
    replace(element, view);
}

function replace(element, view) {
    if (element.contains(view.element)) return;

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }
    element.appendChild(view.element);
}
