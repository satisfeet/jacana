var ContentView = require('./content');
var SidebarView = require('./sidebar');

var template = require('views/store/layout.html');

module.exports = function(app) {
      
    app('/store', function(context, next) {
        if (!context.query('#store')) {
            context.element.innerHTML = template;
        }

        context.contentView = createContentView(context);
        context.sidebarView = createSidebarView(context);
 
        context.productManager.find(null, function(err, products) {
            context.contentView.listProducts(products);
        });
        
        context.sidebarView.on('order:show', function() {
            context.orderManager.findOne(null, function(err, order) {
                if (order) return context.sidebarView.showOrder(order);

                context.orderManager.create(null, function(order) {
                    context.sidebarView.showOrder(order);
                });
            });
        });
        
        context.sidebarView.on('order:push', function(product, variations) {
            context.orderManager.findOne(null, function(err, order) {
                if (order.products.indexOf(product) !== -1) return;
                
                order.pushProduct(product, variations);
         
                context.orderManager.update(order, function(err, order) {
                    context.sidebarView.showOrder(order);
                });
            });
        });
        
        context.sidebarView.on('order:remove', function(product) {
            context.orderManager.findOne(null, function(err, order) {
                var index = order.products.indexOf(product);

                order.products.splice(index, 1);

                context.orderManager.update(order, function(err, order) {
                    context.sidebarView.showOrder(order);
                });
            });
        });

        context.sidebarView.on('order:proceed', function() {
            context.orderManager.findOne(null, function(err, order) {
                context.sidebarView.showOrderCheckout(order);
            });
        });

        context.sidebarView.on('order:submit', function(customer) {
            context.orderManager.findOne(null, function(err, order) {
                order.customer = customer;

                console.log('submitting', order.toJSON());
            });
        });
        
        context.contentView.on('product:show', function(product) {
            context.productManager.findOne(product, function(err, product) {
                context.contentView.selectProduct(product);
                context.sidebarView.showProduct(product);
            });
        });
    });

};

function createContentView(context) {
    var element = context.element.querySelector('#content');

    var contentView = new ContentView(element);

    if (!element) {
        context.element.querySelector('.row')
            .appendChild(contentView.element);
    }

    return contentView;
}

function createSidebarView(context) {
    var element = context.element.querySelector('#sidebar');

    var sidebarView = new SidebarView(element);

    if (!element) {
        context.element.querySelector('.row')
            .appendChild(sidebarView.element);
    }

    return sidebarView;
}
