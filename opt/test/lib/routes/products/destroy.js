var should    = require('should');
var supertest = require('supertest');

module.exports = function(app, mockup) {

  describe('DELETE /products', function() {

    it('should respond OK', function(done) {
      supertest(app).del('/products/' + mockup.product._id)
      .expect(200, done);
    });

  });

};
