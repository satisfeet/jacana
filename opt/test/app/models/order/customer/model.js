var chai    = require('chai');
var exempel = require('exempel');

module.exports = function(app) {

  var Customer = require('../../../../../../app/models/order/customer/model');

  describe('Customer', function() {

    describe('new Customer([source]', function() {

      it('should return an instance of Model', function() {
        chai.expect(new Customer()).to.be.an.instanceOf(exempel.Model);
      });

      it('should set name attribute to object', function() {
        chai.expect(new Customer().get('name')).to.eql({});
      });

      it('should set address attribute to object', function() {
        chai.expect(new Customer().get('address')).to.eql({});
      });

    });

  });

};
