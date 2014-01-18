var chai = require('chai');

module.exports = function(app) {

    var Collection = require('../../../../../../app/models3/core/collection');

    var Items = require('../../../../../../app/models3/order/item/collection');

    describe('Items', function() {

        describe('new Items([source])', function() {

            it('should be an instance of Collection', function() {
                chai.expect(new Items()).to.be.an.instanceOf(Collection);
            });

        });

    });

};
