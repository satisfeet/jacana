var supertest = require('supertest');

module.exports = function(app) {

  describe('/stylesheets', function() {

    it('bootstrap.css', function(done) {
      supertest(app).get('/stylesheets/bootstrap.css').expect(200, done);
    });

    it('boostrap-theme.css', function(done) {
      supertest(app).get('/stylesheets/bootstrap-theme.css').expect(200, done);
    });

  });

};
