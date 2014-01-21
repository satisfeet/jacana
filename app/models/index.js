var OrderItem = require('./order/item/model');

module.exports = function(app) {

    require('./order')(app);

    require('./product')(app);

    app.products.on('order', function(source) {
        var items = app.order.get('items');

        items.push(new OrderItem(source));
    });

};
