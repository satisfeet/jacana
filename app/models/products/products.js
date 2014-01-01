var util   = require('util');
var events = require('events');
var lodash = require('lodash');

var Product = require('./product');

function Products(models) {
    this.models = models || [];

    events.EventEmitter.call(this);
}

util.inherits(Products, events.EventEmitter);

Products.prototype.find = function(id) {
    return lodash.find(this.models, { _id: id });
};

Products.prototype.push = function(model) {
    var product = new Product(model);

    var self = this;
    product.on('order', function(options) {
        self.emit('order', product, options);
    });

    this.models.push(product);

    return this.emit('push', product);
};

Products.prototype.remove = function(product) {
    var model = lodash.remove(this.models, product);

    return this.emit('remove', model);
};

module.exports = Products;
