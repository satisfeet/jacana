var events = require('events');
var should = require('should');

module.exports = function(app, mockup) {
        
    var product;
 
    before(function() {
        app.products.push(mockup.products[0]);

        product = app.products.find(mockup.products[0]);
    });

    describe('product', function() {

        describe('#toJSON', function() {
            
            it('should return serialized object', function() {
                var result = product.toJSON();

                result.should.eql(product.attributes);
            });

        });

    });

};
