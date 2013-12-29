var should    = require('should');
var supertest = require('supertest');

module.exports = function(app, mockup) {

    describe('POST /orders', function() {

        it('should respond order', function(done) {
            supertest(app).post('/orders')
                .send(mockup.order)
                .expect(200, function(err, res) {
                    if (err) throw err;

                    res.body.should.have.properties([
                        'customer',
                        'products'
                    ]);

                    mockup.order = res.body;

                    done();
                });
        });

    });

};
