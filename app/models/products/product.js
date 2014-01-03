var util   = require('util');
var events = require('events');
var lodash = require('lodash');

var DEFAULTS = [
    '_id', 
    'name', 
    'image', 
    'pricing',
    'variations', 
    'description',
    '_version'
];

function Product(object) {
    lodash.merge(this, lodash.pick(object, DEFAULTS));

    events.EventEmitter.call(this);
}

util.inherits(Product, events.EventEmitter);

Product.prototype.toJSON = function() {
    return lodash.pick(this, DEFAULTS);
};

module.exports = Product;
