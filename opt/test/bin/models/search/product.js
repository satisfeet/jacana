var util     = require('util');
var should   = require('should');
var mongoose = require('mongoose');

module.exports = function(app, exec, mockup) {

  var Product = mongoose.model('Product');

  it('should search and stdout products', function(done) {
      var query = { name: mockup.products[0].name };
      var command = util.format('bin/models search product --json \'%s\'',
          JSON.stringify(query));

      exec(command, function(err, stdout, stderr) {
          if (err) throw err;

          stderr.should.be.empty;
          stdout.should.not.be.empty;

          Product.find(query, function(err, docs) {
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

  it('should search and stdout products', function(done) {
      var command = 'bin/models search product';

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
