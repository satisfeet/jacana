module.exports = function(app) {
      
    app('/store', function(context, next) {
        require('./views')(app, context);
        require('./models')(app, context);

        context.events.on('orders:list', function() {
            context.orders.find();
        });
        context.events.on('orders:find', function(orders) {
            context.sidebar.listOrders(orders);
        });
        context.events.on('orders:push', function(product) {
            context.orders.persist(product);
        });

        context.events.on('products:list', function() {
            context.products.find();
        });
        context.events.on('products:find', function(products) {
            context.content.listProducts(products);
        });
        context.events.on('products:show', function(product) {
            context.sidebar.showProduct(product);
        });

        context.events.emit('products:list');
    });

};
