var util   = require('util');
var events = require('events');

var Product = require('./product');

function Products(models) {
    this.models = models || [];

    events.EventEmitter.call(this);
}

util.inherits(Products, events.EventEmitter);

Products.prototype.find = function(id) {
    var result = this.models.filter(function(model) {
        if (model._id === id) return model;
    });

    return result.shift();
};

Products.prototype.push = function(model) {
    var product = new Product(model);

    var self = this;
    product.on('order', function(options) {
        self.emit('order', product, options);
    });

    this.models.push(product);
    this.emit('push', product);

    return this;
};

Products.prototype.remove = function(product) {
    this.models.splice(this.models.indexOf(product), 1);
    this.emit('remove', product);

    return this;
};

module.exports = Products;
