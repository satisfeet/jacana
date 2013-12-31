var util   = require('util');
var clone  = require('clone');
var events = require('events');

var OrderItem = require('./item');

function Order(model) {
    model = model || {};

    this.customer = model.customer || {};
    this.products = [];
    
    (model.products || []).forEach(function(product) {
        this.push(product);
    }, this);

    events.EventEmitter.call(this);
}

util.inherits(Order, events.EventEmitter);

Order.prototype.push = function(model, options) {
    var self = this;

    model = new OrderItem(clone(model));
    model.on('remove', function() {
        self.remove(model);
    });

    this.products.push(model);
    this.emit('push', model);
    this.emit('change');

    return this;
};

Order.prototype.remove = function(model) {
    this.products.forEach(function(product, index, products) {
        if (product._id === model._id) {
            products.splice(index, 1);

            this.emit('remove', product);
            this.emit('change');
        }
    }, this);

    return this;
};

Order.prototype.toJSON = function() {
    return {
        customer: this.customer,
        products: this.products.map(function(product) {
            return product.toJSON()
        })
    };
};

module.exports = Order;
