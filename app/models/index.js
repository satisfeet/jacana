module.exports = function(app) {
    
    require('./order')(app);
    require('./products')(app);

    app.products.on('order', function(product, options) {
        app.order.push(product, options);
    });

};
