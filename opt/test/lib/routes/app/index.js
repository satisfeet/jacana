var should    = require('should');
var supertest = require('supertest');

module.exports = function(app) {

  describe('GET /', function() {

    it('should response OK', function(done) {
      supertest(app).get('/')
      .expect(200, done);
    });

  });

  describe('GET /about', function() {

    it('should response OK', function(done) {
      supertest(app).get('/about')
      .expect(200, done);
    });

  });

  describe('GET /legal', function() {

    it('should response OK', function(done) {
      supertest(app).get('/legal')
      .expect(200, done);
    });

  });

  describe('GET /store', function() {

    it('should respond OK', function(done) {
      supertest(app).get('/store')
      .expect(200, done);
    });

  });

};
