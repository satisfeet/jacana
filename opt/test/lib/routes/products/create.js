var should    = require('should');
var supertest = require('supertest');

module.exports = function(app, mockup) {

  describe('POST /products', function() {

    var product = mockup.products[0];

    it('should respond product', function(done) {
      supertest(app).post('/products').send(product)
      .expect(200, function(err, res) {
        if (err) throw err;

        mockup.product = res.body;

        res.body.should.have.properties(Object.keys(product));

        done();
      });
    });

  });

};
