var ProductListView = require('./product/list');

var SidebarView = require('./sidebar');

var template = require('views/store/layout.html');

module.exports = function(app) {
      
    app('/store', function(context, next) {
        if (!context.query('#store')) {
            context.element.innerHTML = template;
        }

        var sidebarView = createSidebarView(context);
        var productListView = createProductListView(context);
 
        context.productManager.find(null, function(err, products) {
            productListView.list(products);
        });
        
       sidebarView.on('order:show', function() {
            context.orderManager.findOne(null, function(err, order) {
                if (order) return sidebarView.showOrder(order);

                context.orderManager.create(null, function(order) {
                    sidebarView.showOrder(order);
                });
            });
        });
        
        sidebarView.on('order:push', function(product, variations) {
            context.orderManager.findOne(null, function(err, order) {
                if (order.products.indexOf(product) !== -1) return;
                
                order.pushProduct(product, variations);
         
                context.orderManager.update(order, function(err, order) {
                    sidebarView.showOrder(order);
                });
            });
        });
        
        sidebarView.on('order:remove', function(product) {
            context.orderManager.findOne(null, function(err, order) {
                var index = order.products.indexOf(product);

                order.products.splice(index, 1);

                context.orderManager.update(order, function(err, order) {
                    sidebarView.showOrder(order);
                });
            });
        });

        sidebarView.on('order:proceed', function() {
            context.orderManager.findOne(null, function(err, order) {
                sidebarView.showOrderCheckout(order);
            });
        });

        sidebarView.on('order:submit', function(customer) {
            context.orderManager.findOne(null, function(err, order) {
                order.customer = customer;

                console.log('submitting', order.toJSON());
            });
        });
        
        productListView.on('show', function(product) {
            context.productManager.findOne(product, function(err, product) {
                productListView.select(product);
                sidebarView.showProduct(product);
            });
        });
    });

};

function createSidebarView(context) {
    var element = context.element.querySelector('#sidebar');

    var sidebarView = new SidebarView(element);

    if (!element) {
        context.element.querySelector('.row')
            .appendChild(sidebarView.element);
    }

    return sidebarView;
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
