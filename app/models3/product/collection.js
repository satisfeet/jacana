var util = require('util');

var Collection = require('../core/collection');

function Products(source) {
    this.Model = require('./model');

    Collection.call(this, source);
}

util.inherits(Products, Collection);

module.exports = Products;
