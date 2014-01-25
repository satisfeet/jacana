var chai      = require('chai');
var supertest = require('supertest');

module.exports = function(app, mockup) {

  var order = mockup.orders[0];

  describe('POST /orders', function() {

    it('should respond order', function(done) {
      // needs this timeout as it sends an email
      this.timeout(5000);

      supertest(app).post('/orders').accept('json').send(order)
        .expect(200, function(err, res) {
          if (err) throw err;

          chai.expect(res.body).to.contain.keys(Object.keys(order));

          done();
        });
    });

  });

};
