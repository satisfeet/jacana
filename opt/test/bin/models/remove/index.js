var chai     = require('chai');
var mongoose = require('mongoose');

module.exports = function(app, exec, mockup) {

  var Order = mongoose.model('Order');
  var Product = mongoose.model('Product');

  describe('remove', function() {

    it('should remove and stdout orders', function(done) {
      var command = 'bin/models remove order';

      exec(command, function(err, stdout, stderr) {
        if (err) throw err;

        chai.expect(stderr).to.be.empty;
        chai.expect(stdout).to.not.be.empty;

        Order.find(function(err, docs) {
          if (err) throw err;

          chai.expect(docs).to.be.empty;

          done();
        });
      });
    });

    it('should remove and stdout products', function(done) {
      var command = 'bin/models remove product';

      exec(command, function(err, stdout, stderr) {
        if (err) throw err;

        chai.expect(stderr).to.be.empty;
        chai.expect(stdout).to.not.be.empty;

        Product.find(function(err, docs) {
          if (err) throw err;

          chai.expect(docs).to.be.empty;

          done();
        });
      });
    });

  });

};
