var util    = require('util');
var lodash  = require('lodash');
var exempel = require('exempel');

function Customer(source) {
  exempel.Model.call(this, source);
}

util.inherits(Customer, exempel.Model);

Customer.prototype.submit = function() {
  this.emit('submit');

  return this;
};

module.exports = Customer;
