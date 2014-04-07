var util    = require('util');
var exempel = require('exempel');

function Items(source) {
  this.Model = require('./model');

  exempel.Collection.call(this, source);
}

util.inherits(Items, exempel.Collection);

Items.prototype.reset = function() {
  this.forEach(function(item) {
    item.remove();
  });

  return this;
};

module.exports = Items;
