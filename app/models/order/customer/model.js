var util   = require('util');
var lodash = require('lodash');

var Model = require('../../core/model');

function Customer(source) {
  Model.call(this, source);

  if (!this.has('address')) {
    this.set('address', {});
  }
}

util.inherits(Customer, Model);

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

module.exports = Customer;
