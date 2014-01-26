var supertest = require('supertest');

module.exports = function(app, mockup) {

  var product = mockup.products[0];

  describe('GET /', function() {

    it('should response OK', function(done) {
      supertest(app).get('/').accept('html').expect(200, done);
    });

  });

  describe('GET /about', function() {

    it('should response OK', function(done) {
      supertest(app).get('/about').accept('html').expect(200, done);
    });

  });

  describe('GET /legal', function() {

    it('should response OK', function(done) {
      supertest(app).get('/legal').accept('html').expect(200, done);
    });

  });

  describe('GET /order', function() {

    it('should respond OK', function(done) {
      supertest(app).get('/order').accept('html').expect(200, done);
    });

  });

  describe('GET /products', function() {

    it('should respond OK', function(done) {
      supertest(app).get('/products').accept('html').expect(200, done);
    });

  });

  describe('GET /products/:id', function() {

    it('should respond OK', function(done) {
      supertest(app).get('/products/' + product._id).accept('html')
        .expect(200, done);
    });

  });

};
