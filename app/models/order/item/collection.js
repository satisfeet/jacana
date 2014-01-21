var util = require('util');

var Collection = require('../../core/collection');

function Items(source) {
  this.Model = require('./model');

  Collection.call(this, source);
}

util.inherits(Items, Collection);

module.exports = Items;
