var util   = require('util');
var events = require('events');
var lodash = require('lodash');

var OrderItem = require('./item');

var DEFAULTS = [
    'customer',
    'products'
];

function Order(model) {
    model = model || {};

    this.customer = {};
    this.products = [];
    
    lodash.merge(this.customer, model.customer);
    lodash.forEach(model.products, function(product) {
        this.push(product);
    }, this);

    bindToEvents(this);

    events.EventEmitter.call(this);
}

util.inherits(Order, events.EventEmitter);

Order.prototype.push = function(model, options) {
    var self = this;

    model = new OrderItem(model, options);
    model.on('remove', function() {
        self.remove(model);
    });

    this.products.push(model);
    
    return this.emit('push', model);
};

Order.prototype.remove = function(product) {
    var model = lodash.remove(this.products, product);

    return this.emit('remove', product);
};

Order.prototype.toJSON = function() {
    var object = lodash.pick(this, DEFAULTS);

    object.products = lodash.map(object.products, function(product) {
        return product.toJSON();
    });

    return object;
};

module.exports = Order;

function bindToEvents(order) {
    order.on('push', function() {
        order.emit('change');
    });
    order.on('remove', function() {
        order.emit('change');
    });
}
