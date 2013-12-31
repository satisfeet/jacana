var util = require('util');
var events = require('events');

function OrderItem(model) {
    model = model || {};

    this._id = model._id;
    this.name = model.name;
    this.size = model.size;
    this.color = model.color;
    this.quantity = model.quantity;
    this._version = model._version;

    events.EventEmitter.call(this);
}

util.inherits(OrderItem, events.EventEmitter);

OrderItem.prototype.remove = function() {
    this.emit('remove');

    return this;
};

OrderItem.prototype.toJSON = function() {
    return {
        _id: this._id,
        name: this.name,
        color: this.color,
        quantity: this.quantity
    };
};

module.exports = OrderItem;
