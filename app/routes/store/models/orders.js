var util       = require('util');
var store      = require('store');
var events     = require('events');
var superagent = require('superagent');

function Orders() {
    events.EventEmitter.call(this);
}

util.inherits(Orders, events.EventEmitter);

Orders.prototype.find = function(query) {
    this.emit('find', store.get('orders') || []);

    return this;
};

Orders.prototype.persist = function(product) {
    var orders = (store.get('orders') || []).concat(product);

    store.set('orders', orders);
    
    this.emit('persist', product);

    return this;
};

Orders.prototype.remove = function(product) {
    var orders = (store.get('orders') || []).filter(function(order) {
        return order._id !== product._id;
    });

    store.set('orders', orders);

    this.emit('remove', product);

    return this;
};

Orders.prototype.submit = function() {
    var orders = (store.get('orders') || []);

    var self = this;
    superagent.post('/orders')
        .send(orders)
        .end(function(err, res) {
            console.log('submitted');
        });

    return this;
};

module.exports = Orders;
