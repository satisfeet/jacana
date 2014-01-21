var supertest = require('supertest');

module.exports = function(app) {

  describe('/images', function() {

    it('brand/small.svg', function(done) {
      supertest(app).get('/images/brand/small.svg').expect(200, done);
    });

    it('brand/large.svg', function(done) {
      supertest(app).get('/images/brand/large.svg').expect(200, done);
    });

    it('icons/email.svg', function(done) {
      supertest(app).get('/images/icons/email.svg').expect(200, done);
    });

    it('icons/twitter.svg', function(done) {
      supertest(app).get('/images/icons/twitter.svg').expect(200, done);
    });

    it('icons/facebook.svg', function(done) {
      supertest(app).get('/images/icons/facebook.svg').expect(200, done);
    });

    it('graphics/broken.svg', function(done) {
      supertest(app).get('/images/graphics/broken.svg').expect(200, done);
    });

    it('graphics/missmatch.svg', function(done) {
      supertest(app).get('/images/graphics/missmatch.svg').expect(200, done);
    });

    it('graphics/toosmall.svg', function(done) {
      supertest(app).get('/images/graphics/toosmall.svg').expect(200, done);
    });

  });

};
