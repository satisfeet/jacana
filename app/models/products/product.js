var util = require('util');
var events = require('events');

function Product(object) {
    object = object || {};

    this._id = object._id;
    this.name = object.name;
    this.image = object.image;
    this.description = object.description;
    this.variations = object.variations;
    this._version = object._version;

    events.EventEmitter.call(this);
}

util.inherits(Product, events.EventEmitter);

Product.prototype.toJSON = function() {
    return {
        _id: this._id,
        _version: this._version,
        name: this.name,
        image: this.image,
        variations: this.variations,
        description: this.description
    };
};

module.exports = Product;
