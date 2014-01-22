var chai = require('chai');

module.exports = function(app) {

  var Model = require('../../../../../../app/models/core/model');

  var Customer = require('../../../../../../app/models/order/customer/model');

  describe('Customer', function() {

    describe('new Customer([source]', function() {

      it('should return an instance of Model', function() {
        chai.expect(new Customer()).to.be.an.instanceOf(Model);
      });

      it('should set address attribute to object', function() {
        chai.expect(new Customer().get('address')).to.eql({});
      });

    });

    describe('Event: "change"', function() {

      it('should be emitted on #setAddress', function(done) {
        var customer = new Customer();

        customer.once('change', function(key, value) {
          chai.expect(key).to.equal('address');
          chai.expect(value).to.equal(customer.get(key));

          done();
        }).setAddress('streetNr', '3');
      });

    });

    describe('#hasAddress(key)', function() {

      it('should return false', function() {
        var customer = new Customer();

        chai.expect(customer.hasAddress('street')).to.be.false;
      });

      it('should return true', function() {
        var customer = new Customer({
          address: { street: 'Attilastraße' }
        });

        chai.expect(customer.hasAddress('street')).to.be.true;
      });

    });

    describe('#getAddress(key)', function() {

      it('should return attribute of address', function() {
        var customer = new Customer({
          address: { street: 'Attilastraße' }
        });

        chai.expect(customer.getAddress('street'))
        .to.equal('Attilastraße');
      });

    });

    describe('#setAddress(key, value)', function() {

      it('should return customer', function() {
        var customer = new Customer();

        chai.expect(customer.setAddress('place', 'Berlin'))
        .to.equal(customer);
      });

      it('should set attribute on address', function() {
        var customer = new Customer().setAddress('place', 'Berlin');

        chai.expect(customer.getAddress('place')).to.equal('Berlin');
      });

      it('should emit "change:address" event', function(done) {
        var customer = new Customer();

        customer.once('change:address', function(address) {
          chai.expect(address).to.equal(customer.get('address'));

          done();
        }).setAddress('streetNr', '3');
      });

    });

  });

};
