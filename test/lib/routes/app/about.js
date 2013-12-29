var should    = require('should');
var supertest = require('supertest');

module.exports = function(app) {

    describe('GET /about', function() {

        it('should response OK', function(done) {
            supertest(app).get('/about')
                .expect(200, done);
        });

    });

};
