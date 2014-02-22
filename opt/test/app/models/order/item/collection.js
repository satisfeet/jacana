var chai    = require('chai');
var exempel = require('exempel');

module.exports = function(mockup) {

  var Items = require('../../../../../../app/models/order/item/collection');

  describe('Items', function() {

    describe('new Items([source])', function() {

      it('should be an instance of Collection', function() {
        chai.expect(new Items()).to.be.an.instanceOf(exempel.Collection);
      });

    });

  });

};
