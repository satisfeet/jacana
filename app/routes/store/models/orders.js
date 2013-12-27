var util   = require('util');
var store  = require('store');
var events = require('events');

function Orders() {
    store.set('orders', []);

    events.EventEmitter.call(this);
}

util.inherits(Orders, events.EventEmitter);

Orders.prototype.find = function(query) {
    this.emit('find', store.get('orders'));

    return this;
};

Orders.prototype.persist = function(product) {
    var orders = store.get('orders').concat(product);

    this.emit('persist', store.set('orders', orders) || orders);

    return this;
};

module.exports = Orders;
