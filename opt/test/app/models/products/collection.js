var events = require('events');
var should = require('should');

module.exports = function(app, mockup) {

    var products = mockup.products;

    describe('products', function() {

        describe('#push', function() {

            it('should return products', function() {
                var result = app.products.push(products[0]);

                result.should.be.equal(app.products);
            });

        });
     
        describe('#find', function() {

            it('should return null', function() {
                var result = app.products.find();
                
                should(result).should.be.null;
            });

            it('should return product', function() {
                var result = app.products.find(products[0]);

                result.should.equal(app.products.models[0]);
            });

        });

    });

};
