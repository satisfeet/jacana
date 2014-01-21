var should    = require('should');
var supertest = require('supertest');

module.exports = function(app, mockup) {

  describe('GET /products', function() {

    it('should respond empty array', function(done) {
      supertest(app).get('/products')
      .expect(200, function(err, res) {
        if (err) throw err;

        res.body.should.be.an.Array;

        done();
      });
    });

  });

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

  describe('GET /products/:id', function() {

    it('should respond product', function(done) {
      supertest(app).get('/products/' + mockup.product._id)
      .expect(200, function(err, res) {
        if (err) throw err;

        res.body.should.eql(mockup.product);

        done();
      });
    });

  });

  describe('PUT /products/:id', function() {

    it('should respond OK', function(done) {
      mockup.product.description += 'blub';

      supertest(app).put('/products/' + mockup.product._id)
      .send(mockup.product)
      .expect(200, done);
    });

  });

  describe('DELETE /products/:id', function() {

    it('should respond OK', function(done) {
      supertest(app).del('/products/' + mockup.product._id)
      .expect(200, done);
    });

  });

};
