var util    = require('util');
var lodash  = require('lodash');
var exempel = require('exempel');

function Customer(source) {
  exempel.Model.call(this, source);

  if (!this.has('address')) {
    this.set('address', {});
  }
}

util.inherits(Customer, exempel.Model);

Customer.prototype.hasAddress = function(key) {
  return lodash.has(this.get('address'), key);
};

Customer.prototype.getAddress = function(key) {
  return this.get('address')[key];
};

Customer.prototype.setAddress = function(key, value) {
  var address = this.get('address') || {};

  address[key] = value;

  // to ensure that events are emitted
  return this.set('address', address);
};

Customer.prototype.submit = function() {
  this.emit('submit');

  return this;
};

module.exports = Customer;
