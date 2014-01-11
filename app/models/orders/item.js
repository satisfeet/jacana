var util   = require('util');
var events = require('events');
var lodash = require('lodash');

function OrderItem(object) {
    this.attributes = object || {};

    events.EventEmitter.call(this);
}

util.inherits(OrderItem, events.EventEmitter);

OrderItem.prototype.remove = function() {
    this.emit('remove');

    return this;
};

OrderItem.prototype.toJSON = function() {
    return lodash.clone(this.attributes);
};

module.exports = OrderItem;
