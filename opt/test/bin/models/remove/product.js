var chai     = require('chai');
var mongoose = require('mongoose');

module.exports = function(app, exec, mockup) {

  var Product = mongoose.model('Product');

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

};
