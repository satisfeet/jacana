var util = require('util');
var events = require('events');
var lodash = require('lodash');

var DEFAULTS = ['_id', 'name', 'size', 'color', 'quantity'];

function OrderItem(model) {
    model = lodash.pick(model, DEFAULTS) || {};
    
    lodash.merge(this, model);

    events.EventEmitter.call(this);
}

util.inherits(OrderItem, events.EventEmitter);

OrderItem.prototype.remove = function() {
    this.emit('remove');

    return this;
};

OrderItem.prototype.toJSON = function() {
    return lodash.pick(this, DEFAULTS);
};

module.exports = OrderItem;
