var util    = require('util');
var lodash  = require('lodash');
var exempel = require('exempel');

function Customer(source) {
  exempel.Model.call(this, source);

  if (!this.has('name')) {
    this.set('name', {});
  }
  if (!this.has('address')) {
    this.set('address', {});
  }
}

util.inherits(Customer, exempel.Model);

Customer.prototype.submit = function() {
  this.emit('submit');

  return this;
};

module.exports = Customer;
