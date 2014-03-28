var supertest = require('supertest');

var app = require('../lib');

describe('GET /javascripts/build.js', function() {

  it('should respond javascript', function(done) {
    supertest(app).get('/javascripts/build.js')
      .expect('Content-Type', /javascript/)
      .expect(200, done);
  });

});
