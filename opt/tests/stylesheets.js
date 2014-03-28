var supertest = require('supertest');

var app = require('../../lib');

describe('GET /stylesheets/build.css', function() {

  it('should respond css', function(done) {
    supertest(app).get('/stylesheets/build.css')
      .expect('Content-Type', /css/)
      .expect(200, done);
  });

});
