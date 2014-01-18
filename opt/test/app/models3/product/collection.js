var chai = require('chai');

module.exports = function(app, mockup) {

    var Collection = require('../../../../../app/models3/core/collection');

    var Products = require('../../../../../app/models3/product/collection');

    describe('Products', function() {

        describe('new Products([source])', function() {

            it('should be an instance of Collection', function() {
                chai.expect(new Products()).to.be.an.instanceOf(Collection);
            });

        });

    });

};
