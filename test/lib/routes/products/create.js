var should    = require('should');
var supertest = require('supertest');

module.exports = function(app, mockup) {

    describe('POST /products', function() {

        it('should respond product', function(done) {
            supertest(app).post('/products')
                .send(mockup.product)
                .expect(200, function(err, res) {
                    if (err) throw err;

                    res.body.should.have.properties([
                        '_id',
                        'name',
                        'description'
                    ]);

                    mockup.product = res.body;

                    done();
                });
        });

    });

};
