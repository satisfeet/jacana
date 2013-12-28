module.exports = function(app) {
      
    app('/store', function(context, next) {
        require('./views')(app, context);
        require('./models')(app, context);

        context.orders.on('find', function(orders) {
            context.sidebar.listOrders(orders);
        });
        context.products.on('find', function(products) {
            context.content.listProducts(products);
        });
        
        context.sidebar.on('click:orders', function() {
            context.orders.find();
        });
        context.content.on('click:product', function(product) {
            context.content.selectProduct(product);
            context.sidebar.showProduct(product);
        });
        context.sidebar.on('click:product:add', function(product) {
            context.orders.persist(product);
        });
    });

};
