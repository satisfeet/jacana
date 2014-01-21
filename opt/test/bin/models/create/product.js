var chai     = require('chai');
var mongoose = require('mongoose');

module.exports = function(app, exec, mockup) {

  var Product = mongoose.model('Product');

  it('should created and stdout products', function(done) {
    var command = 'bin/models create product --file ./opt/models/product';

    exec(command, function(err, stdout, stderr) {
      if (err) throw err;

      chai.expect(stderr).to.be.empty;
      chai.expect(stdout).to.not.be.empty;

      Product.find(function(err, docs) {
        if (err) throw err;

        var object = JSON.parse(stdout).map(function(doc) {
          return new Product(doc).toJSON();
        });

        chai.expect(object).to.eql(docs.map(function(doc) {
          return doc.toJSON();
        }));

        done();
      });
    });
  });

};
