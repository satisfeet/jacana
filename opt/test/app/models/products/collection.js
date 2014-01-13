var events = require('events');
var should = require('should');

module.exports = function(app, mockup) {

    var Product = app.Product;
    var Products = app.Products;

    describe('Product', function() {
        
        var products;

        describe('new Products([source])', function() {

            it('should set properties', function() {
                products = new Products();
                products.models.should.eql([]);
            });

            it('should map source to array', function() {
                products = new Products(mockup.products);
                products.models.forEach(function(model, index) {
                    model.should.be.an.instanceOf(Product);
                    model.attributes.should.eql(mockup.products[index]);
                });
            });

            it('should inherit from EventEmitter', function() {
                products = new Products(mockup.products);
                products.should.be.instanceOf(events.EventEmitter);
            });

        });

        describe('#find(product)', function() {

            before(function() {
                products = new Products(mockup.products);
            });

            it('should return matching product', function() {
                var product = mockup.products[0];
                var model = products.find(product);

                should(model).not.be.undefined;
                model.toJSON().should.eql(product);
            });

            it('should return undefined', function() {
                should(products.find({ _id: 33 })).be.undefined;
            });

        });

        describe('#push(product)', function() {

        });

        describe('#remove(product)', function() {

        });

    });

};
