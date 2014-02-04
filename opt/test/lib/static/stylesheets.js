var supertest = require('supertest');

module.exports = function(app) {

  describe('/stylesheets', function() {

    it('build.css', function(done) {
      supertest(app).get('/stylesheets/build.css').expect(200, done);
    });

  });

};
