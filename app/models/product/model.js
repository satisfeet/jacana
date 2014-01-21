var util   = require('util');
var lodash = require('lodash');

var Model = require('../core/model');

function Product(source) {
  Model.call(this, source);
}

util.inherits(Product, Model);

Product.prototype.order = function(options) {
  var source = lodash.merge(this.toJSON(), options);

  // TODO: Product does not equal Item in
  // pricing scheme. Would require
  // redefinition of schemes.
  source.pricing = source.pricing && source.pricing.retail;

  this.emit('order', source);

  return this;
};

module.exports = Product;
