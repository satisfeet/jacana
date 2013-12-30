var OrderManager = require('./manager');

module.exports = function(context) {
    var orderManager = new OrderManager();
 
    context.events.on('orders:findOne', function(query) {
        orderManager.findOne(query, function(err, order) {
            if (err) throw err;

            context.events.emit('orders:foundOne', order);
        });
    });
 
    context.events.on('orders:create', function(order) {
        orderManager.create(order, function(err, order) {
            if (err) throw err;

            context.events.emit('orders:created', order);
        });
    });

    context.events.on('orders:update', function(order) {
        orderManager.update(order, function(err, order) {
            if (err) throw err;

            context.events.emit('orders:updated', order);
        });
    });
 
    context.events.on('orders:remove', function(order) {
        orderManager.remove(order, function(err, order) {
            if (err) throw err;

            context.events.emit('orders:removed', order);
        });
    });

    context.events.on('orders:submit', function(order) {
        orderManager.submit(order, function(err, order) {
            if (err) throw err;

            context.events.emit('orders:submitted', order);
        });
    });
};
