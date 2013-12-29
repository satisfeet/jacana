var should    = require('should');
var supertest = require('supertest');
var superagent = require('superagent');

module.exports = function(app) {

    describe('/javascripts', function() {

        it('build.js', function(done) {
            supertest(app).get('/javascripts/build.js')
                .expect(200, done);
        });

    });

};
