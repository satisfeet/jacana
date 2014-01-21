var should    = require('should');
var supertest = require('supertest');

module.exports = function(app, mockup) {

  describe('POST /orders', function() {

    var order = mockup.orders[0];

    it('should respond order', function(done) {
      this.timeout(5000);

      supertest(app).post('/orders').send(order)
      .expect(200, function(err, res) {
        if (err) throw err;

        mockup.order = res.body;

        res.body.should.have.properties(Object.keys(order));

        done();
      });
    });

  });

};
