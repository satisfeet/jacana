var chai      = require('chai');
var mongoose  = require('mongoose');
var supertest = require('supertest');

module.exports = function(app, mockup) {

  var products = mockup.products;

  before(function(done) {
    mongoose.model('Product').create(products, done);
  });

  describe('GET /products', function() {

    it('should respond empty array', function(done) {
      supertest(app).get('/products').accept('json')
        .expect(200, function(err, res) {
          if (err) throw err;

          chai.expect(res.body).be.an('array');

          products = res.body;

          done();
        });
    });

  });

  describe('GET /products/:id', function() {

    it('should respond product', function(done) {
      supertest(app).get('/products/' + products[0]._id).accept('json')
        .expect(200, function(err, res) {
          if (err) throw err;

          chai.expect(res.body).to.eql(products[0]);

          done();
        });
    });

  });

  after(function(done) {
    mongoose.model('Product').remove(products, done);
  });

};
