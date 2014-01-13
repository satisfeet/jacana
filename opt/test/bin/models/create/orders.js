var util     = require('util');
var should   = require('should');
var mongoose = require('mongoose');

module.exports = function(app, exec, mockup) {

    var Order = mongoose.model('Order');

    it('should create and stdout orders', function(done) {
        var command = 'bin/models create order --file ./opt/models/orders';

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
