var util   = require('util');
var lodash = require('lodash');

var Collection = require('../core/collection');

function Products(source) {
  this.Model = require('./model');

  listenToPushEvent(this);
  listenToRemoveEvent(this);

  Collection.call(this, source);
}

util.inherits(Products, Collection);

Products.prototype.find = function(query) {
  return lodash.find(this.models, {
    attributes: query
  });
};

module.exports = Products;

function listenToPushEvent(collection) {
  collection.on('push', function(model) {
    model.on('order', function(source) {
      collection.emit('order', source, model);
    });
  });
}

function listenToRemoveEvent(collection) {
  collection.on('remove', function(model) {
    model.removeAllListeners('order');
  });
}
