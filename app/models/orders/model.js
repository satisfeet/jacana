var util   = require('util');
var events = require('events');
var lodash = require('lodash');

var OrderItem = require('./item');

function Order(object) {
    this.attributes = object || {
        customer: {},
        pricing: {},
        items: []
    };

    this.attributes.items = this.attributes.items.map(function(item) {
        this.addItem(this.createItem(item));
    }, this);

    bindToEvents(this);

    events.EventEmitter.call(this);
}

util.inherits(Order, events.EventEmitter);

Order.prototype.addItem = function(item) {
    var value = item.attributes.pricing * item.attributes.quantity;
    
    bindToItemEvents(item, this);

    this.attributes.items.push(item);
    this.increasePricing(value);
    this.emit('items:add', item);

    return this;
};

Order.prototype.removeItem = function(item) {
    var value = item.attributes.pricing * item.attributes.quantity;
    
    lodash.remove(this.attributes.items, item);

    this.decreasePricing(value);
    this.emit('items:remove', item);

    return this;
};

Order.prototype.createItem = function(product, options) {
    var object = lodash.merge(product, options);

    return new OrderItem(object);
};

Order.prototype.increasePricing = function(value) {
    var pricing = this.attributes.pricing;

    if (!lodash.isNumber(pricing.retail)) pricing.retail = 0;
    if (!lodash.isNumber(pricing.total)) pricing.total = 0;

    pricing.retail += value;
    pricing.total += value;

    return this;
};

Order.prototype.decreasePricing = function(value) {
    var pricing = this.attributes.pricing;

    if (!lodash.isNumber(pricing.retail)) pricing.retail = 0;
    if (!lodash.isNumber(pricing.total)) pricing.total = 0;

    pricing.retail -= value;
    pricing.total -= value;

    return this;
};

Order.prototype.toJSON = function() {
    var object = {};

    object.customer = lodash.clone(this.attributes.customer);
    object.pricing = lodash.clone(this.attributes.pricing);
    object.items = this.attributes.items.map(function(item) {
        return item.toJSON();
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

function bindToItemEvents(item, order) {
    item.once('remove', function() {
        order.removeItem(item);
    });
}
