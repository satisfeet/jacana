var chai    = require('chai');
var exempel = require('exempel');

module.exports = function(app) {

  var Item = require('../../../../../../app/models/order/item/model');

  describe('Item', function() {

    describe('new Item([source])', function() {

      it('should be an instance of Model', function() {
        chai.expect(new Item()).to.be.an.instanceOf(exempel.Model);
      });

    });

  });

};
