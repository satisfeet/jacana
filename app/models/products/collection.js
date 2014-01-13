var util   = require('util');
var events = require('events');
var lodash = require('lodash');

var Product = require('./model');

function Products(models) {
    models = models || [];

    this.models = [];

    models.forEach(this.push, this);

    events.EventEmitter.call(this);
}

util.inherits(Products, events.EventEmitter);

Products.prototype.find = function(product) {
    if (!product) return null;

    return findProduct(product, this);
};

Products.prototype.push = function(product) {
    var model = createProduct(product, this);

    this.emit('push', model);

    return this;
};

Products.prototype.shift = function(product) {
    var model = removeProduct(product, this);

    this.emit('remove', model);
    
    return this;
};

module.exports = Products;

function findProduct(product, collection) {
    return collection.models.filter(function(model) {
        return model.attributes._id === product._id;
    }).shift();
}

function createProduct(product, collection) {
    var model = new Product(product);

    model.on('order', function(options) {
        collection.emit('order', product, options);
    });
    collection.models.push(model);

    return model;
}

function removeProduct(product, collection) {
    var model = findProduct(product, collection);

    collection.models.splice(collection.models.indexOf(model), 1);

    return model.removeAllListeners();
}
