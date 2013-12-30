var store      = require('store');
var superagent = require('superagent');

function OrderManager() {

}

OrderManager.prototype.findOne = function(query, callback) {
    var order = store.get('order');

    callback(null, order);

    return this;
};

OrderManager.prototype.create = function(order, callback) {
    store.set('order', order || { customer: {}, products: [] });

    callback(null, order || { customer: {}, products: [] });

    return this;
};

OrderManager.prototype.update = function(order, callback) {
    store.set('order', order);

    callback(null, order);
    
    return this;
};

OrderManager.prototype.remove = function(order, callback) {
    store.set('orders', null);

    callback(null, order);

    return this;
};

OrderManager.prototype.submit = function(order, callback) {
    var order = store.get('order');

    superagent.post('/orders').send(order).end(function(err, res) {
        if (err) return callback(err);

        callback(null, res.body);
    });

    return this;
};

module.exports = OrderManager;
