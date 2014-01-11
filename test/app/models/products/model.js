var events = require('events');
var should = require('should');

module.exports = function(app, mockup) {

    var Product = app.Product;

    describe('Product', function() {
        
        var product;

        describe('new Product([source])', function() {

            it('should set properties', function() {
                product = new Product();
                product.attributes.should.eql({});
            });

            it('should set properties to object', function() {
                product = new Product(mockup.products[0]);
                product.attributes.should.equal(mockup.products[0]);
            });

            it('should inherit from EventEmitter', function() {
                product = new Product(mockup.products[0]);
                product.should.be.instanceOf(events.EventEmitter);
            });

        });

        describe('#toJSON', function() {

            before(function() {
                product = new Product(mockup.products[0]);
            });

            it('should return attributes', function() {
                product.toJSON().should.eql(mockup.products[0]);
            });

            it('should clone attributes', function() {
                var object = product.toJSON();

                object.name = 'A Sock';
                object.images.main.path = '/images/a-sock.jpeg';

                product.attributes.should.eql(mockup.products[0]);
            });

        });

    });

};
