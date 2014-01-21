var should    = require('should');
var supertest = require('supertest');

module.exports = function(app) {

  describe('GET /', function() {

    it('should response OK', function(done) {
      supertest(app).get('/')
      .expect(200, done);
    });

  });

};
