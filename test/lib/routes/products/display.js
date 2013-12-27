var should    = require('should');
var supertest = require('supertest');

module.exports = function(app, mockup) {

    describe('GET /products/:id', function() {

        it('should respond product', function(done) {
            supertest(app).get('/products/' + mockup.product._id)
                .expect(200, function(err, res) {
                    if (err) throw err;

                    res.body.should.eql(mockup.product);

                    done();
                });
        });

    });

};
