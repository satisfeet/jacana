var supertest = require('supertest');

var app = require('../lib');

describe('GET /images/brand/small.svg', function() {

  it('should respond image', function(done) {
    supertest(app).get('/images/brand/small.svg')
      .expect('Content-Type', /image/)
      .expect(200, done);
  });

});

describe('GET /images/brand/large.svg', function() {
	
	it('should respond image', function(done) {
    supertest(app).get('/images/brand/large.svg')
      .expect('Content-Type', /image/)
      .expect(200, done);
  });

});
