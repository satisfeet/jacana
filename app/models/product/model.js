var util   = require('util');
var lodash = require('lodash');

var Model = require('../core/model');

function Product(source) {
  Model.call(this, source);
}

util.inherits(Product, Model);

Product.prototype.order = function(options) {
  this.emit('order', lodash.merge(this.toJSON(), options));

  return this;
};

module.exports = Product;
