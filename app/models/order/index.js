var store      = require('store');
var superagent = require('superagent');

var Order = require('./order');

module.exports = function(app) {

    app.order = createOrder();

    app.order.on('change', function() {
        console.log(app.order.toJSON());
        store.set('order', app.order.toJSON());
    });

    app.order.on('checkout', function() {
        superagent.post('/orders')
            .send(app.order)
            .end();
    });

    app('*', function(context, next) {
        context.order = app.order;

        next();
    });

};

function createOrder() {
    return new Order(store.get('order'));
}
