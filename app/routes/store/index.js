module.exports = function(app) {
      
    app('/store', function(context, next) {
        require('./views')(app, context);
        require('./models')(app, context);

        context.orders.on('find', function(orders) {
            context.sidebar.listOrders(orders);
        });
        context.orders.on('remove', function(order) {
            context.sidebar.removeOrder(order);
        });
        context.sidebar.on('click:orders:list', function() {
            context.orders.find();
        });
        context.sidebar.on('click:orders:remove', function(order) {
            context.orders.remove(order);
        });
        context.sidebar.on('click:orders:submit', function() {
            context.orders.submit();
        });
 
        context.products.on('find', function(products) {
            context.content.listProducts(products);
        });
        context.content.on('click:products:show', function(product) {
            context.content.selectProduct(product);
            context.sidebar.showProduct(product);
        });
        context.sidebar.on('click:products:add', function(product) {
            context.orders.persist(product);
        });
    });

};
