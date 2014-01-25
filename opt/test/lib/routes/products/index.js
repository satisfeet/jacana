var chai      = require('chai');
var supertest = require('supertest');

module.exports = function(app, mockup) {

  var product = mockup.products[0];

  describe('GET /products', function() {

    it('should respond empty array', function(done) {
      supertest(app).get('/products').accept('json')
        .expect(200, function(err, res) {
          if (err) throw err;

          chai.expect(res.body).be.an('array');

          done();
        });
    });

  });

  describe('POST /products', function() {

    it('should respond product', function(done) {
      supertest(app).post('/products').accept('json').send(product)
        .expect(200, function(err, res) {
          if (err) throw err;

          chai.expect(res.body).to.contain.keys(Object.keys(product));

          product = res.body;

          done();
        });
    });

  });

  describe('GET /products/:id', function() {

    it('should respond product', function(done) {
      supertest(app).get('/products/' + product._id).accept('json')
        .expect(200, function(err, res) {
          if (err) throw err;

          chai.expect(res.body).to.eql(product);

          done();
        });
    });

  });

  describe('PUT /products/:id', function() {

    it('should respond OK', function(done) {
      product.description += 'blub';

      supertest(app).put('/products/' + product._id).accept('json')
        .send(product).expect(200, done);
    });

  });

  describe('DELETE /products/:id', function() {

    it('should respond OK', function(done) {
      supertest(app).del('/products/' + product._id).accept('json')
        .expect(200, done);
    });

  });

};
