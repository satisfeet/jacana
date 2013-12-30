var ProductManager = require('./manager');

module.exports = function(context) {
    var productManager = new ProductManager();

    context.events.on('products:find', function(query) {
        productManager.find(query, function(err, products) {
            if (err) throw err;

            context.events.emit('products:found', products);
        });
    });
 
    context.events.on('products:findOne', function(query) {
        productManager.findOne(query, function(err, product) {
            if (err) throw err;

            context.events.emit('products:foundOne', product);
        });
    });
};
