var util     = require('util');
var should   = require('should');
var mongoose = require('mongoose');

module.exports = function(app, exec, mockup) {

    var Order = mongoose.model('Order');

    it('should remove and stdout orders', function(done) {
        var command = 'bin/models remove order';

        exec(command, function(err, stdout, stderr) {
            if (err) throw err;

            stderr.should.be.empty;
            stdout.should.not.be.empty;

            Order.find(function(err, docs) {
                if (err) throw err;

                docs.should.be.empty;

                done();
            });
        });
    });

};
