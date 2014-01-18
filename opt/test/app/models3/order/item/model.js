var chai = require('chai');

module.exports = function(app) {

    var Model = require('../../../../../../app/models3/core/model');

    var Item = require('../../../../../../app/models3/order/item/model');

    describe('Item', function() {

        describe('new Item([source])', function() {

            it('should be an instance of Model', function() {
                chai.expect(new Item()).to.be.an.instanceOf(Model);
            });

        });

    });

};
