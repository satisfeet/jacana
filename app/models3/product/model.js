var util = require('util');

var Model = require('../core/model');

function Product(source) {
    Model.call(this, source);
}

util.inherits(Product, Model);

module.exports = Product;
