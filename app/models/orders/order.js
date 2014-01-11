var util   = require('util');
var events = require('events');
var lodash = require('lodash');

var OrderItem = require('./item');

function Order(object) {
    this.attributes = {};
    this.attributes.pricing = {};
    this.attributes.customer = {};
    this.attributes.products = [];

    lodash.merge(this.attributes.pricing, object && object.pricing);
    lodash.merge(this.attributes.customer, object && object.customer);

    (object && object.products || []).forEach(function(product) {
        this.push(product);
    }, this);

    bindToEvents(this);

    events.EventEmitter.call(this);
}

util.inherits(Order, events.EventEmitter);

Order.prototype.push = function(product) {
    var self = this;

    model = new OrderItem(product);
    model.on('remove', function() {
        self.remove(model);
    });

    this.attributes.products.push(model);
    
    return this.emit('push', model);
};

Order.prototype.remove = function(product) {
    var model = lodash.remove(this.attributes.products, product);

    return this.emit('remove', product);
};

Order.prototype.toJSON = function() {
    var object = {};

    object.pricing = lodash.clone(this.attributes.pricing);
    object.customer = lodash.clone(this.attributes.customer);

    object.products = this.attributes.products.map(function(product) {
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
