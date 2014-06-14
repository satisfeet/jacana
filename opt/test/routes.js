var supertest = require('supertest');

var app = require('../../lib').listen();

describe('GET /', function() {

  it('should respond html', function(done) {
    supertest(app).get('/')
      .accept('html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

});

describe('GET /about', function() {

  it('should respond html', function(done) {
    supertest(app).get('/about')
      .accept('html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

});

describe('GET /legal', function() {

  it('should respond html', function(done) {
    supertest(app).get('/legal')
      .accept('html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

});

describe('GET /order', function() {

  it('should respond html', function(done) {
    supertest(app).get('/order')
      .accept('html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

});

describe('GET /products', function() {

  it('should respond html', function(done) {
    supertest(app).get('/products')
      .accept('html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

});
