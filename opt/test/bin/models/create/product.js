var should   = require('should');
var mongoose = require('mongoose');

module.exports = function(app, exec, mockup) {

  var Product = mongoose.model('Product');

  it('should created and stdout products', function(done) {
    var command = 'bin/models create product --file ./opt/models/product';

    exec(command, function(err, stdout, stderr) {
      if (err) throw err;

      stderr.should.be.empty;
      stdout.should.not.be.empty;

      Product.find(function(err, docs) {
        if (err) throw err;

        JSON.parse(stdout).map(function(doc) {
          return new Product(doc).toJSON();
        }).should.eql(docs.map(function(doc) {
          return doc.toJSON();
        }));

        done();
      });
    });
  });

};
