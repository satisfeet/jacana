var util = require('util');

var Model = require('../../core/model');

function Pricing(source) {
    Model.call(this, source);

    if (!this.has('retail') || !this.has('total')) {
        this.set({ retail: 0, total: 0 });
    }
}

util.inherits(Pricing, Model);

Pricing.prototype.addRetail = function(value) {
    this.set('retail', round(this.get('retail') + value));
    this.set('total', round(this.get('total') + value));

    return this;
};

Pricing.prototype.subRetail = function(value) {
    this.addRetail(-value);

    return this;
};

module.exports = Pricing;

function round(value) {
    return parseFloat(value.toFixed(2));
}
