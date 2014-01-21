var should    = require('should');
var supertest = require('supertest');

module.exports = function(app, mockup) {

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

  describe('POST /orders', function() {

    var order = mockup.orders[0];

    it('should respond order', function(done) {
      // needs this timeout as it sends an email
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

  describe('GET /orders/:id', function() {

    it('should respond order', function(done) {
      supertest(app).get('/orders/' + mockup.order._id)
        .expect(200, function(err, res) {
          if (err) throw err;

          res.body.should.eql(mockup.order);

          done();
        });
    });

  });

  describe('DELETE /orders/:id', function() {

    it('should respond OK', function(done) {
      supertest(app).del('/orders/' + mockup.order._id)
        .expect(200, done);
    });

  });

};
