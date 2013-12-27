var Orders   = require('./orders');
var Products = require('./products');

module.exports = function(app, context) {
    context.orders = new Orders();
    context.products = new Products();

    context.orders.on('find', function(orders) {
        context.events.emit('orders:find', orders);
    });
    
    context.products.on('find', function(products) {
        context.events.emit('products:find', products);
    });

    context.products.find();
};
