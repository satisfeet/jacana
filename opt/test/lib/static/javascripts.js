var supertest = require('supertest');

module.exports = function(app) {

  describe('/javascripts', function() {

    it('build.js', function(done) {
      supertest(app).get('/javascripts/build.js').expect(200, done);
    });

  });

};
