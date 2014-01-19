var util     = require('util');
var should   = require('should');
var mongoose = require('mongoose');

module.exports = function(app, exec, mockup) {

    var Order = mongoose.model('Order');
    
    it('should search and stdout order', function(done) {
        var query = { name: mockup.orders[0].name };
        var command = util.format('bin/models search order --json \'%s\'', 
            JSON.stringify(query));

        exec(command, function(err, stdout, stderr) {
            if (err) throw err;

            stderr.should.be.empty;
            stdout.should.not.be.empty;

            Order.find(query, function(err, docs) {
                if (err) throw err;

                JSON.parse(stdout).map(function(doc) {
                    return new Order(doc).toJSON();
                }).should.eql(docs.map(function(doc) {
                    return doc.toJSON();
                }));

                done();
            });
        });
    });

    it('should search and stdout orders', function(done) {
        var command = 'bin/models search order';

        exec(command, function(err, stdout, stderr) {
            if (err) throw err;

            stderr.should.be.empty;
            stdout.should.not.be.empty;

            Order.find(function(err, docs) {
                if (err) throw err;

                JSON.parse(stdout).map(function(doc) {
                    return new Order(doc).toJSON();
                }).should.eql(docs.map(function(doc) {
                    return doc.toJSON();
                }));

                done();
            });
        });
    });

};
