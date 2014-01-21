var util     = require('util');
var chai     = require('chai');
var mongoose = require('mongoose');

module.exports = function(app, exec, mockup) {

  var Order = mongoose.model('Order');
  var Product = mongoose.model('Product');

  describe('search', function() {

    it('should search and stdout order', function(done) {
      var query = { name: mockup.orders[0].name };
      var command = util.format('bin/models search order --json \'%s\'',
          JSON.stringify(query));

      exec(command, function(err, stdout, stderr) {
        if (err) throw err;

        chai.expect(stderr).to.be.empty;
        chai.expect(stdout).to.not.be.empty;

        Order.find(query, function(err, docs) {
          if (err) throw err;

          var object1 = JSON.parse(stdout).map(function(doc) {
            return new Order(doc).toJSON();
          });
          var object2 = docs.map(function(doc) {
            return doc.toJSON();
          });

          chai.expect(object1).to.eql(object2);

          done();
        });
      });
    });

    it('should search and stdout orders', function(done) {
      var command = 'bin/models search order';

      exec(command, function(err, stdout, stderr) {
        if (err) throw err;

        chai.expect(stderr).to.be.empty;
        chai.expect(stdout).to.not.be.empty;

        Order.find(function(err, docs) {
          if (err) throw err;

          var object1 = JSON.parse(stdout).map(function(doc) {
              return new Order(doc).toJSON();
          });
          var object2 = docs.map(function(doc) {
              return doc.toJSON();
          });

          chai.expect(object1).to.eql(object2);

          done();
        });
      });
    });

    it('should search and stdout products', function(done) {
      var query = { name: mockup.products[0].name };
      var command = util.format('bin/models search product --json \'%s\'',
          JSON.stringify(query));

      exec(command, function(err, stdout, stderr) {
        if (err) throw err;

        chai.expect(stderr).to.be.empty;
        chai.expect(stdout).to.not.be.empty;

        Product.find(query, function(err, docs) {
          if (err) throw err;

          var object1 = JSON.parse(stdout).map(function(doc) {
            return new Product(doc).toJSON();
          });
          var object2 = docs.map(function(doc) {
            return doc.toJSON();
          });

          chai.expect(object1).to.eql(object2);

          done();
        });
      });
    });

    it('should search and stdout products', function(done) {
      var command = 'bin/models search product';

      exec(command, function(err, stdout, stderr) {
        if (err) throw err;

        chai.expect(stderr).to.be.empty;
        chai.expect(stdout).to.not.be.empty;

        Product.find(function(err, docs) {
          if (err) throw err;

          var object1 = JSON.parse(stdout).map(function(doc) {
            return new Product(doc).toJSON();
          });
          var object2 = docs.map(function(doc) {
            return doc.toJSON();
          });

          chai.expect(object1).to.eql(object2);

          done();
        });
      });
    });

  });

};
