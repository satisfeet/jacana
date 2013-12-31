var util   = require('util');
var clone  = require('clone');
var events = require('events');

function OrderModel(object) {
    this.customer = (object && object.customer) || {};
    this.products = (object && object.products) || [];

    events.EventEmitter.call(this);
}

util.inherits(OrderModel, events.EventEmitter);

OrderModel.prototype.pushProduct = function(product, options) {
    var product = clone(product);

    product.variations = options;

    this.products.push(product);

    return this;
};

OrderModel.prototype.toJSON = function() {
    return {
        customer: this.customer,
        products: this.products
    };
};

module.exports = OrderModel;
