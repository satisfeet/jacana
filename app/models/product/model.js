var util    = require('util');
var exempel = require('exempel');

function Product(source) {
  exempel.Model.call(this, source);
}

util.inherits(Product, exempel.Model);

Product.prototype.order = function(options) {
  this.emit('order', options);

  return this;
};

module.exports = Product;
