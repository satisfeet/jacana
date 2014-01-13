var should    = require('should');
var supertest = require('supertest');

module.exports = function(app, mockup) {

    describe('GET /orders/:id', function() {

        it('should respond order', function(done) {
            supertest(app).get('/orders/' + mockup.order._id)
                .expect(200, function(err, res) {
                    if (err) throw err;

                    res.body.should.eql(mockup.order);

                    done();
                });
        });

    });

};
