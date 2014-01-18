var util = require('util');

var Model = require('../core/model');

var Items = require('./item/collection');
var Pricing = require('./pricing/model');
var Customer = require('./customer/model');

function Order(source) {
    Model.call(this, source);

    this.set('items', new Items(this.get('items')));
    this.set('pricing', new Pricing(this.get('pricing')));
    this.set('customer', new Customer(this.get('customer')));
}

util.inherits(Order, Model);

Order.prototype.toJSON = function() {
    return {
        items: this.get('items').toJSON(),
        pricing: this.get('pricing').toJSON(),
        customer: this.get('customer').toJSON()
    };
};

module.exports = Order;
