var util = require('util');

var Model = require('../../core/model');

function Pricing(source) {
  Model.call(this, source);

  setup(this);
}

util.inherits(Pricing, Model);

Pricing.prototype.addRetail = function(value) {
  var retail = this.get('retail');
  var total = this.get('total');

  this.set('retail', round(retail + value));
  this.set('total', round(total + value));

  return this;
};

Pricing.prototype.subRetail = function(value) {
  this.addRetail(-value);

  return this;
};

module.exports = Pricing;

function setup(model) {
  var retail = model.get('retail');
  var total = model.get('total');

  if (!retail || !total) {
    model.set({ retail: 0, total: 0 });
  }
}

function round(value) {
  return parseFloat(value.toFixed(2));
}
