var should    = require('should');
var supertest = require('supertest');

module.exports = function(app, mockup) {

  describe('PUT /products/:id', function() {

    it('should respond OK', function(done) {
      mockup.product.description += 'blub';

      supertest(app).put('/products/' + mockup.product._id)
      .send(mockup.product)
      .expect(200, done);
    });

  });

};
