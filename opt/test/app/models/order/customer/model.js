var chai    = require('chai');
var exempel = require('exempel');

module.exports = function(mockup) {

  var Customer = require('../../../../../../app/models/order/customer/model');

  describe('Customer', function() {

    describe('new Customer([source]', function() {

      it('should return an instance of Model', function() {
        chai.expect(new Customer()).to.be.an.instanceOf(exempel.Model);
      });

    });

  });

};
