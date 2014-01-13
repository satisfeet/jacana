var should    = require('should');
var supertest = require('supertest');

module.exports = function(app) {

    describe('GET /legal', function() {

        it('should response OK', function(done) {
            supertest(app).get('/legal')
                .expect(200, done);
        });

    });

};
