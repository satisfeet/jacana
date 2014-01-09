var should    = require('should');
var supertest = require('supertest');

module.exports = function(app, mockup) {

    describe('DELETE /orders', function() {

        it('should respond OK', function(done) {
            supertest(app).del('/orders/' + mockup.order._id)
                .expect(200, done);
        });

    });

};
