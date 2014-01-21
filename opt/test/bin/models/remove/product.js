var should   = require('should');
var mongoose = require('mongoose');

module.exports = function(app, exec, mockup) {

  var Product = mongoose.model('Product');

  it('should remove and stdout products', function(done) {
    var command = 'bin/models remove product';

    exec(command, function(err, stdout, stderr) {
      if (err) throw err;

      stderr.should.be.empty;
      stdout.should.not.be.empty;

      Product.find(function(err, docs) {
        if (err) throw err;

        docs.should.be.empty;

        done();
      });
    });
  });

};
