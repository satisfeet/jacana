var HelpInfoView    = require('./help/info');
var OrderInfoView   = require('./order/info');
var OrderCheckoutView = require('./order/checkout');
var ProductInfoView = require('./product/info');
var ProductListView = require('./product/list');

var template = require('views/store/layout.html');

module.exports = function(app) {
      
    app('/store', function(context, next) {
        if (!context.query('#store')) {
            context.element.innerHTML = template;
        }

        var helpInfoView = createHelpInfoView(context);
        var productInfoView = createProductInfoView(context);
        var productListView = createProductListView(context);
        var orderCheckoutView = createOrderCheckoutView(context);
        var orderInfoView = createOrderInfoView(context);
 
        context.productManager.find(null, function(err, products) {
            productListView.list(products);
        });
        
        context.element.querySelector('button[name="order"]')
            .addEventListener('click', function(e) {
                context.orderManager.findOne(null, function(err, order) {
                    if (order) {
                        replaceSidebarInner(context, orderInfoView);
                        
                        return orderInfoView.show(order);
                    }

                    context.orderManager.create(null, function(order) {
                        orderInfoView.show(order);

                        replaceSidebarInner(context, orderInfoView);
                    });
                });
            });
        
        productInfoView.on('push', function(product, variations) {
            context.orderManager.findOne(null, function(err, order) {
                if (order.products.indexOf(product) !== -1) return;
                
                order.pushProduct(product, variations);
         
                context.orderManager.update(order, function(err, order) {
                    orderInfoView.show(order);
                    
                    replaceSidebarInner(context, orderInfoView);
                });
            });
        });
        
        orderInfoView.on('remove', function(product) {
            context.orderManager.findOne(null, function(err, order) {
                var index = order.products.indexOf(product);

                order.products.splice(index, 1);

                context.orderManager.update(order, function(err, order) {
                    orderInfoView.show(order);
                    
                    replaceSidebarInner(context, orderInfoView);
                });
            });
        });

        orderInfoView.on('proceed', function() {
            context.orderManager.findOne(null, function(err, order) {
                replaceSidebarInner(context, orderCheckoutView);

                orderCheckoutView.show(order);
            });
        });

        orderInfoView.on('submit', function(customer) {
            context.orderManager.findOne(null, function(err, order) {
                order.customer = customer;

                console.log('submitting', order.toJSON());
            });
        });
        
        productListView.on('show', function(product) {
            context.productManager.findOne(product, function(err, product) {
                productListView.select(product);
                productInfoView.show(product);

                replaceSidebarInner(context, productInfoView);
            });
        });
    });

};

function createHelpInfoView(context) {
    var element = context.element.querySelector('#help-info');

    var helpInfoView = new HelpInfoView(element);

    if (!element) {
        context.element.querySelector('#sidebar-inner')
            .appendChild(helpInfoView.element);
    }

    return helpInfoView;
}

function createOrderInfoView(context) {
    var element = context.element.querySelector('#order-info');

    return new OrderInfoView(element);
}

function createOrderCheckoutView(context) {
    var element = context.element.querySelector('#order-checkout');

    return new OrderCheckoutView(element);
}

function createProductInfoView(context) {
    var element = context.element.querySelector('#product-info');

    return new ProductInfoView(element);
}

function createProductListView(context) {
    var element = context.element.querySelector('#product-list');

    var productListView = new ProductListView(element);

    if (!element) {
        context.element.querySelector('#content-inner')
            .appendChild(productListView.element);
    }

    return productListView;
}

function replaceSidebarInner(context, view) {
    var element = context.element.querySelector('#sidebar-inner');

    while (element.lastElementChild) {
        element.lastElementChild.remove();
    }

    element.appendChild(view.element);
}
