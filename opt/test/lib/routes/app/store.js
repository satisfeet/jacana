var should    = require('should');
var supertest = require('supertest');

module.exports = function(app) {

  describe('GET /store', function() {

    it('should respond OK', function(done) {
      supertest(app).get('/store')
      .expect(200, done);
    });

  });

};
