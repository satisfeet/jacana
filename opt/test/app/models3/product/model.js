var chai = require('chai');

module.exports = function(app, mockup) {

    var Model = require('../../../../../app/models3/core/model');

    var Product = require('../../../../../app/models3/product/model');

    describe('Product', function() {

        describe('new Product([source])', function() {

            it('should be an instance of Model', function() {
                chai.expect(new Product()).to.be.an.instanceOf(Model);
            });

        });

    });

};
