var should    = require('should');
var supertest = require('supertest');

module.exports = function(app) {

  describe('GET /orders', function() {

    it('should respond empty array', function(done) {
      supertest(app).get('/orders')
      .expect(200, function(err, res) {
        if (err) throw err;

        res.body.should.be.an.Array;

        done();
      });
    });

  });

};
