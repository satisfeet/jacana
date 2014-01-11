var util   = require('util');
var events = require('events');
var lodash = require('lodash');

function Product(object) {
    this.attributes = object || {};

    events.EventEmitter.call(this);
}

util.inherits(Product, events.EventEmitter);

Product.prototype.toJSON = function() {
    return lodash.cloneDeep(this.attributes);
};

module.exports = Product;
