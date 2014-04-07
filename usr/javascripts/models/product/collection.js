var util    = require('util');
var lodash  = require('lodash');
var exempel = require('exempel');

function Products(source) {
  this.Model = require('./model');

  listenToPushEvent(this);
  listenToRemoveEvent(this);

  exempel.Collection.call(this, source);
}

util.inherits(Products, exempel.Collection);

Products.prototype.find = function(query) {
  return lodash.find(this.models, {
    attributes: query
  });
};

module.exports = Products;

function listenToPushEvent(collection) {
  collection.on('push', function(model) {
    model.on('order', function(options) {
      collection.emit('order', model, options);
    });
  });
}

function listenToRemoveEvent(collection) {
  collection.on('remove', function(model) {
    model.removeAllListeners('order');
  });
}
