var util    = require('util');
var exempel = require('exempel');

function Pricing(source) {
  exempel.Model.call(this, source);

  if (!this.has('total')) this.set('total', 0);
  if (!this.has('retail')) this.set('retail', 0);
  if (!this.has('quantity')) this.set('quantity', 0);

  listenToChangeEvent(this);
}

util.inherits(Pricing, exempel.Model);

Pricing.prototype.addRetail = function(value) {
  var retail = this.get('retail');

  this.set('retail', round(retail + value));

  return this;
};

Pricing.prototype.addQuantity = function(value) {
  this.set('quantity', this.get('quantity') + parseInt(value));

  return this;
};

module.exports = Pricing;

function listenToChangeEvent(model) {
  model.on('change:retail', recalc);
  model.on('change:shipment', recalc);

  function recalc() {
    var retail = model.get('retail') || 0;
    var shipment = model.get('shipment') || 0;

    model.set('total', round(retail + shipment));
  }
}

function round(value) {
  return parseFloat(value.toFixed(2));
}
