var chai      = require('chai');
var supertest = require('supertest');

module.exports = function(app, mockup) {

  var order = mockup.orders[0];

  describe('GET /orders', function() {

    it('should respond empty array', function(done) {
      supertest(app).get('/orders').accept('json')
        .expect(200, function(err, res) {
          if (err) throw err;

          chai.expect(res.body).to.be.an('array');

          done();
        });
    });

  });

  describe('POST /orders', function() {

    it('should respond order', function(done) {
      // needs this timeout as it sends an email
      this.timeout(5000);

      supertest(app).post('/orders').accept('json').send(order)
        .expect(200, function(err, res) {
          if (err) throw err;

          chai.expect(res.body).to.contain.keys(Object.keys(order));

          order = res.body;

          done();
        });
    });

  });

  describe('GET /orders/:id', function() {

    it('should respond order', function(done) {
      supertest(app).get('/orders/' + order._id).accept('json')
        .expect(200, function(err, res) {
          if (err) throw err;

          chai.expect(res.body).to.eql(order);

          done();
        });
    });

  });

  describe('DELETE /orders/:id', function() {

    it('should respond OK', function(done) {
      supertest(app).del('/orders/' + order._id).accept('json')
        .expect(200, done);
    });

  });

};
